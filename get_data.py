# -*- coding: utf-8 -*-
"""
@Time ： 2022/5/7 0:52
@Auth ： 吉吉
@File ：get_data.py
@IDE ：PyCharm
@Description : 未添加描述
"""

import pandas as pd
import json
import numpy as np


def get_dish_list(hotel) :
    data = pd.read_csv('./data1/私房小站（'+hotel+'分店）.txt',sep='\t')
    dish_list = list(set(list(data['菜品类别'])))
    return dish_list

def get_data(hotel, dish):

    dict_return = {}
    data = pd.read_csv('./data1/私房小站（'+hotel+'分店）.txt',sep='\t')
    for i in data.index :
        data.loc[i,'菜品消费金额'] = data.loc[i, '消费数量（单个菜品）']*data.loc[i,'菜品单价']
    city = data['店铺所在地'][0]
    dict_return ['city'] = city
    dict_return['dish'] = dish
    dict_return['h'] = hotel
    dict_return['hotel'] = '私房小站--'+hotel+'分店'


    # 柱状图数据
    data_sale = data [data ['菜品类别'] == dish].copy()
    for i in data_sale.index :
        data_sale.loc [i, '消费日期'] = str(data_sale.loc [i, '点餐时间']) [:-9]
    data1 = data_sale [['消费日期', '消费数量（单个菜品）']]
    bar_title = dish
    date = set(list(data1 ['消费日期']))
    date = sorted(date)
    bar_x_data = []
    bar_y_data = []
    bar_data = data1.groupby('消费日期').sum()
    for i in date :
        bar_y_data.append(bar_data.loc [i, '消费数量（单个菜品）'])
        bar_x_data.append(i)
    dict_return ['bar_data'] = {'title' : bar_title, 'x_data' : bar_x_data,
                                'y_data' : bar_y_data}

    # 折线图数据
    data2 = data_sale
    data2 = data2[['消费日期','菜品消费金额']]
    line_data = data2.groupby('消费日期').sum()
    line_title = dish
    line_x_data = []
    line_y_data = []
    for i in date :
        line_y_data.append(line_data.loc [i, '菜品消费金额'])
        line_x_data.append(i)
    dict_return['line_data'] = {'title':line_title,'x_data':line_x_data,'y_data':line_y_data}

    # 地图高亮
    dict_return['city_highlight'] = [{'name' : city+'市','selected' : 'true'}]

    # 气泡图数据
    data3 = data_sale[['订单号','会员名称','消费金额']]
    vip_list = set(list(data_sale['会员名称']))
    # order_num = set(list(data_sale['订单号']))
    data3 = data3.drop_duplicates(subset=['订单号'])   # 去除重复订单
    data4 = data3[['会员名称','消费金额']]
    sca_data = data4.groupby('会员名称').sum()
    sca_all = []
    for i in vip_list:
        sca = {'name' : i,'value' : sca_data.loc[i,'消费金额']}
        sca_all.append(sca)
    dict_return['sca_data'] = sca_all

    # 滚动窗数据
    roll_data = []
    for i in data_sale.index :
        item = {'order' : data_sale.loc [i, '订单号'],
                'vip_name' : data_sale.loc [i, '菜品名称'],
                'sale_num' : data_sale.loc [i, '消费数量（单个菜品）'],
                'price' : data_sale.loc [i, '菜品单价'],
                'sale_money' : data_sale.loc [i, '消费金额'], }
        roll_data.append(item)
    dict_return['roll_data'] = roll_data


    # 词云数据
    # 饼图数据
    pie_data = []
    name_data = {}
    word_data = {}
    wordcloud_data = []
    dish_name = set(list(data_sale ['菜品名称']))
    data5 = data_sale[['菜品名称','菜品消费金额']]
    data5 = data5.groupby('菜品名称').sum()
    for name in dish_name :
        salenum = data5.loc[name,'菜品消费金额']
        name_data = {'value':salenum,'name':name}
        word_data = {'name' : name,'value' : salenum, }
        pie_data.append(name_data)
        wordcloud_data.append(word_data)
    dict_return['pie_data'] = pie_data
    dict_return['wordcloud_data'] = wordcloud_data

    # 另一个饼图数据，显示各个菜品类别销售占比
    dish_list = set(list(data['菜品类别'])) # 因为有的餐厅不是所有菜都有，例如禅城没有啤酒
    data6 = data[['菜品类别','菜品消费金额']]
    data6 = data6.groupby('菜品类别').sum()
    pie1_data = []
    pie1_list = {}
    for dish in dish_list :
        salemoney = data6.loc [dish, '菜品消费金额']
        pie1_list = {'value' : salemoney, 'name' : dish}
        pie1_data.append(pie1_list)
    dict_return['pie1_data'] = pie1_data

    return dict_return