from PIL import Image, ImageDraw, ImageFont


class Thumbnail :

    def __init__(self, bgColor='#fff') -> None :
        self.size = (1280 , 720)
        self.bg = bgColor
        self.image = Image.new('RGB', self.size, bgColor)


    def get_image (self) : 
        return self.image


    def add_text(self,message,text_x=0,text_y=0, font=None, fontColor='#000'):
        
        if font is None :
            font = ImageFont.truetype('app/r.ttf',50)
        else:
            font = ImageFont.truetype('app/r.ttf',font)
        
        W, H = self.size
        draw = ImageDraw.Draw(self.image)
        
        if font is not None :
            _, _, w, h = draw.textbbox((0, 0), message, font=font)
            draw.text((text_x, text_y ), message, font=font, fill=fontColor)
        else:
            _, _, w, h = draw.textbbox((0, 0), message)
            draw.text((text_x, text_y ), message, fill=fontColor)

        return self.image

    def add_img (self, **kwargs) : 
        img = Image.open(kwargs['img'])

        img_w = kwargs['img_w']
        img_h = kwargs['img_h']
        img_x = kwargs['img_x']
        img_y = kwargs['img_y']

        sec_img = img
        sec_img = sec_img.resize((img_w,img_h))

        self.image.paste(sec_img,box=(img_x ,img_y))




# img = Thumbnail(bgColor='blue')


# # Add Image
# img.add_img(
#     img = Image.open('RED.jpeg'),
#     img_w = 200,
#     img_h = 300,
#     img_x = img.image.width - 200 ,
#     img_y = 100 ,
# )

# for i in range (5) :
# # Add  Text
#     img.add_text(
#         message="My Name is Radwan",
#         fontColor='#fff',
#         text_y = 10 + (i * 10),
#         text_x = 15 + (i * 10),
#         )


# # shiw image
# img.get_image().show() 


