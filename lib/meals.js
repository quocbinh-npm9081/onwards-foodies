import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals(){
    //all() lấy toàn bộ hàng trả về
    //get() lấy 1 kết quả đầu tiên
    //run() thực hiện các câu lệnh cập nhập trang thái của dữ liệu (Insert, Update, Delete)
    await new Promise((resolve) => setTimeout(resolve, 5000));    
    return db.prepare('SELECT * FROM meals').all();
}


export function getMeal(slug){
    return db.prepare(`SELECT * FROM meals WHERE slug=?`).get(slug);
}

export function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true})
    meal.instructions = xss(meal.instructions)
}