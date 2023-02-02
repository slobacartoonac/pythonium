use wasm_bindgen::prelude::*;
use std::convert::TryInto;
use std::cmp;

pub use self::view::View;
pub mod view;
const COLORS: f32 = 16.0 * 16.0;

//wasm-pack build

#[wasm_bindgen]
pub struct Gravity {
    width: u32,
    height: u32,
    view: View
}

pub struct Crgba {
    r: u8,
    g: u8,
    b: u8,
    a: u8
}

#[inline]
fn square_distance(a_x: f32, a_y: f32, b_x: f32, b_y: f32)-> f32{
    let r_x = a_x - b_x;
    let r_y = a_y - b_y;
    let square = r_x.powf(2.0)+r_y.powf(2.0);
    return if square < 1.0 {
        1.0
    } else {
        square
    }
}
fn distance_color(color: &Crgba, color_b: &Crgba) -> f32 {
    let mut square: i32 = 0;
    square += (color.r as i32 - color_b.r as i32) * (color.r as i32 - color_b.r as i32);
    square += (color.b as i32 - color_b.b as i32) * (color.b as i32 - color_b.b as i32);
    square += (color.g as i32 - color_b.g as i32) * (color.g as i32 - color_b.g as i32);
    //square += (color.a as i32 - color_b.a as i32) * (color.a as i32 - color_b.a as i32);
    return if square < 1 {
        1.0
    } else {
        (square as f32).sqrt()
    }
}
#[inline]
fn interpolate_color(color: &Crgba, color_b: &Crgba, over: f32) -> Crgba {
    let left = 1.0 - over;
    Crgba {
        r: (color.r as f32 * left + color_b.r as f32 * over).round() as u8,
        b: (color.b as f32 * left + color_b.b as f32 * over).round() as u8,
        g: (color.g as f32 * left + color_b.g as f32 * over).round() as u8,
        a: (color.a as f32 * left + color_b.a as f32 * over).round() as u8
    }
}

#[wasm_bindgen]
impl Gravity {
    pub fn new(width: u32, height: u32) -> Gravity {
        let view =  View {
            x: 0,
            y: 0,
            scale: 0.0,
        };
        Gravity {
            width,
            height,
            view,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn set_view(&mut self, x: u32, y: u32, scale: f32){
        self.view = View {
            x,
            y,
            scale
        }
    }

    pub fn draw_planets(&self,
        data: &mut [u8],
        planets: &[f32],
        planets_length: u32,
        view: &[f32]
    ){
        let buffer_length: usize = (self.width * self.height * 4) as usize;
        let u_width:usize = self.width as usize;
        let row_length:usize = u_width*4;
        let u_width_f32 = u_width as f32;

        let row_length_usize = row_length as usize;
        let planets_length_usize = planets_length as usize;

        let pixel_size_f = 2.0;
        let pixel_size: usize = 2;
        let step = pixel_size_f / view[2];
        let half_length:usize = buffer_length/2;
        let with_half = self.width as f32/2.0;
        let height_half = self.height as f32/2.0;

        let mut pi_x:f32 = 0.0;
        let mut pi_y:f32 = 0.0;
        let view_start_x =  view[0] - (with_half-1.0)/view[2];
        let mut view_x: f32 = view_start_x;
        let mut view_y: f32 = view[1] - (height_half-1.0)/view[2];

        let mut offset:usize = 0;

        for i in (0..half_length as usize).step_by(pixel_size*4) {
            let mut sum: f32 = 0.0;
            for p_index in (0..planets_length_usize).step_by(3) {
                let x = planets[p_index];
                let y = planets[p_index + 1];
                let mass = planets[p_index + 2];
                sum = sum + 3000.0 * mass /
                square_distance(view_x, view_y, x, y)
            }
            let color_min2 = f32::min(sum / 16.0, COLORS - 1.0 );
			let color_min = f32::max(f32::min(sum, COLORS - 1.0 ) - color_min2 * color_min2 * 0.3, 0.0);

            let r:u8 = (color_min2 as i32).try_into().unwrap();
            let b:u8 = (color_min as i32).try_into().unwrap();
            let g:u8 = 0;
            let a:u8 = 255;
            //let pixel = self.get_pixel(pi_x, pi_y);
            let rgba = Crgba {r,b,g,a};
            self.set_pixel_val(data,
                rgba,
                i + offset,
                row_length_usize,
                pixel_size);

            pi_y = if (pi_x % u_width_f32) == u_width_f32 - pixel_size_f {
                offset=offset+row_length_usize;
                view_y += step;
                pi_y + pixel_size_f
            } else {
                pi_y
            };
            pi_x += pixel_size_f;
            view_x += step;
            if pi_x >= u_width_f32 {
                pi_x = 0.0;
                view_x = view_start_x;
            } 
        }
    }
    #[inline]
    fn set_pixel_val(
        &self,
        data: &mut [u8],
        color: Crgba,
        index: usize,
        row_length_usize: usize,
        size: usize){
        let mut row_ofset = index.clone();
        let mut column_ofset: usize = 0;
        let a = cmp::min(
            distance_color(&color, &Crgba{r:0, b:0, g:0, a: 0}).round() as i32 * 2,
            255) as u8;
        let over = a as f32 / 255.0;
        for _ in 0..size {
            for _ in 0..size{
                let to_put = interpolate_color(&Crgba{
                    r: data[ row_ofset + column_ofset ],
                    g: data[ row_ofset + column_ofset + 1],
                    b: data[ row_ofset + column_ofset + 2],
                    a: data[ row_ofset + column_ofset + 3]}
                    ,&color
                    ,over);
                data[ row_ofset + column_ofset ] = to_put.r;
                data[ 1 + row_ofset + column_ofset ] = to_put.g;
                data[ 2 + row_ofset + column_ofset ] = to_put.b;
                data[ 3 + row_ofset + column_ofset ] = to_put.a;
                column_ofset +=4;
            }
            column_ofset = 0;
            row_ofset+=row_length_usize;
        }
    }
    // pub fn mutate_data(&self, data: &mut [u8], length: u32){
    //     let length=(length).try_into().unwrap();
    //     for i in 0..length {
    //         // 1 (inclusive) to 21 (exclusive)
    //         let new_val= ((i%4)*63).try_into().unwrap();
    //         data[i]=new_val;
    //     }
    // }
}
