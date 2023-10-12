from django.shortcuts import render, HttpResponse
from django.http import FileResponse
from django.views.decorators.csrf import csrf_exempt
import ast, json, uuid
from .thumbnail import Thumbnail

def index (request) : 
    return render(request,'index.html')



@csrf_exempt
def upload_data (request) :
    
    if request.method == "POST" : 
        data = request.POST['component_list']
        data = ast.literal_eval(data)
        text_list = data['text']
        img_list = data['img']
        board_bg = data['board']['bg']
        list_img_files =request.FILES.getlist('img') 
        thumb = Thumbnail(bgColor=board_bg)

        
        for img in img_list:
            name = img['name']
            x = img['x']
            y = img['y']
            width = img['width']
            height = img['height']

            thumb.add_img(
                img = [i for i in list_img_files if i.name == name][0],
                img_w = width * 4,
                img_h = height * 4,
                img_x = x * 4,
                img_y = y * 4,
            )

        for text in text_list : 
            thumb.add_text(
                fontColor=text['font_color'],
                message=text['name'],
                text_x=text['x'] * 4,
                text_y=text['y'] * 4,
                font=int(text['font_size']) * 4
            )

        path = f'media/{uuid.uuid4()}.png'
        thumb.get_image().save(path)
        
        # user_img = open(path,'rb')    
        return HttpResponse(path)



    return HttpResponse('Done')