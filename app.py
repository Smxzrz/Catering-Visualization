# -*- coding: utf-8 -*-
"""
@Time ： 2022/5/5 16:12
@Auth ： 吉吉
@File ：app.py.py
@IDE ：PyCharm
@Description : 未添加描述
"""

from flask import Flask, request, render_template
from get_data import get_data,get_dish_list

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():


    if request.method == 'POST':
        hotel = request.form.get('hotel')
        dish = request.form.get('dish')
        # 判断用户输入的两个数据的正误并进行对应的跳转
        term1 = any(hotel == i for i in ['天河','珠海','番禺','盐田','禅城','福田','罗湖','越秀','顺德']) # 判断店铺名是否正确
        if term1 == True :
            dish_lsit = get_dish_list(hotel)
            term2 = any(dish ==i for i in dish_lsit)    # 菜品类别
            if  term2== True :
                dict_return = get_data(hotel, dish)
                return render_template('index.html', dict_return=dict_return)
            else :
                    dict_return = get_data(hotel, dish_lsit[0])
                    return render_template('index.html', dict_return=dict_return)
        else:
            dict_return = get_data('天河', '虾类')
            return render_template('index.html', dict_return=dict_return)
    else:
        dict_return = get_data('天河', '虾类')
        return render_template('index.html', dict_return=dict_return)
if __name__ == '__main__' :
    app.run()
