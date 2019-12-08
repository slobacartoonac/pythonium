use wasm_bindgen::prelude::*;
use std::convert::TryInto;
use std::cmp;

pub use self::view::View;
pub mod view;

//wasm-pack build

#[wasm_bindgen]
pub struct Gravity {
    width: u32,
    height: u32,
    view: View
}

#[inline]
fn square_distance(a_x: f32, a_y: f32, b_x: f32, b_y: f32)-> f32{
    let r_x = a_x - b_x;
    let r_y = a_y - b_y;
    r_x.powf(2.0)+r_y.powf(2.0)+0.1
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
        let with_half = self.width as f32/2.0;
        let height_half = self.height as f32/2.0;
        let row_length_usize = row_length as usize;
        let planets_length_usize = planets_length as usize;
        let half_length:usize = buffer_length/2;
        let mut pi_x:f32 = 0.0;
        let mut pi_y:f32 = 0.0;
        let view_start_x =  view[0] - (with_half-1.0)/view[2];
        let mut view_x: f32 = view_start_x;
        let mut view_y: f32 = view[1] - (height_half-1.0)/view[2];
        let step = 2.0 / view[2];
        let mut offset:usize = 0;
        for i in (0..half_length as usize).step_by(8) {
            let mut sum: f32 = 0.0;
            for p_index in (0..planets_length_usize).step_by(3) {
                let x = planets[p_index];
                let y = planets[p_index + 1];
                let mass = planets[p_index + 2];
                sum = sum + 800.0 * mass /
                square_distance(view_x, view_y, x, y)
            }
            let color_f32= sum/32.0;
            let color_min2= cmp::min(color_f32 as i32,192);
            let color_min= cmp::max(cmp::min(sum as i32,192) - (color_f32*color_f32) as i32, 0);

            let r:u8 = (color_min2).try_into().unwrap();
            let b:u8 = (color_min).try_into().unwrap();
            let g:u8 = 0;
            let a:u8 = 255;
            //let pixel = self.get_pixel(pi_x, pi_y);
            data[i+offset]= r;
            data[i+offset+1]= g;
            data[i+offset+2]= b;
            data[i+offset+3]= a;
            data[i+offset+4]= r;
            data[i+offset+5]= g;
            data[i+offset+6]= b;
            data[i+offset+7]= a;
            data[i+offset+row_length_usize]= r;
            data[i+offset+1+row_length_usize]= g;
            data[i+offset+2+row_length_usize]= b;
            data[i+offset+3+row_length_usize]= a;
            data[i+offset+4+row_length_usize]= r;
            data[i+offset+5+row_length_usize]= g;
            data[i+offset+6+row_length_usize]= b;
            data[i+offset+7+row_length_usize]= a;
            pi_y = if (pi_x % u_width_f32) == u_width_f32 - 2.0 {
                offset=offset+row_length_usize;
                view_y += step;
                pi_y + 2.0
            } else {
                pi_y
            };
            pi_x += 2.0;
            view_x += step;
            if pi_x >= u_width_f32 {
                pi_x = 0.0;
                view_x = view_start_x;
            } 
        }
    }

    pub fn mutate_data(&self, data: &mut [u8], length: u32){
        let length=(length).try_into().unwrap();
        for i in 0..length {
            // 1 (inclusive) to 21 (exclusive)
            let new_val= ((i%4)*63).try_into().unwrap();
            data[i]=new_val;
        }
    }
}
