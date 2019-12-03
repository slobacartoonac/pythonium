use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct View {
    pub x: u32,
    pub y: u32,
    pub scale: f32,
}