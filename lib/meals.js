import fs from 'node:fs'

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region : 'ap-southeast-2'
})

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

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
    
    const bufferedImage = await meal.image.arrayBuffer();

    console.log("SAVE IMAGE TO S3");
    

    // lưu món ăn ở s3
    s3.putObject({
        Bucket: 'binhquoc-nextjs-15-dummy-data',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });
    
    console.log("SAVE IMAGE TO DONE");

    
    meal.image = fileName;
    
    // lưu món ăn ở DB
    db.prepare(
        `
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
        )
    `
    ).run(meal);
}