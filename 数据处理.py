# -*- coding: utf-8 -*-
"""
@Time ： 2022/5/4 19:46
@Auth ： 吉吉
@File ：数据处理.py
@IDE ：PyCharm
@Description : 未添加描述
"""

path = 'data/餐饮综合案例数据.xlsx'
import pandas as pd

import numpy as np
import datetime as dt


# df = pd.read_excel(path,sheet_name='订单信息表')
# df_copy = df.copy()  # 告诉dataframe我们设置了一个副本，防止修改订单号时出错
# for index in range(len(df_copy)) :
#     list_order = list(str(df_copy.loc[index,'订单号']))     # 将int型订单号转化为列表
#     list_order.pop(-4)    # 删除倒数第四位
#     order = ''.join(list_order)         # 将列表转化为字符串
#     order = int(order)      # 将字符串转为整数型
#
#     df_copy.loc[index,'订单号'] = order
# print(df_copy)
# df_copy.to_csv('订单信息表.csv',sep='\t',index=None)    #将其输出为一个新的excel表格


# 读取三个表
# data_detail = pd.read_excel(path,sheet_name='订单详情表')
# data_dishes = pd.read_excel(path,sheet_name='菜品信息表')
# data_order = pd.read_csv('data/订单信息表.csv', sep='\t')

# 连接三个表
# order_all = pd.merge(data_order,data_detail,on='订单号')
# df = pd.merge(order_all,data_dishes,on='菜品名称')
# 将日期和时间连接起来作为点餐时间
# for i in range(len(df)):
#     df.loc[i,'点餐时间'] = str(df.loc[i,'日期'])+' '+str(df.loc[i,'时间'])
# print(df.all())   #查看三个表的信息，注意价格_y才是我们要的单价

# 按照数据处理的要求重组一个新表
# 订单号、会员名称、店铺所在地、消费金额、菜品名称、菜品单价、消费数量（单个菜品）、菜品成本、菜品类别、菜品口味、点餐时间
# hotel_list = {'店铺名':df['店铺名'],'订单号' : df['订单号'], '会员名称' : df['会员名'] ,
#          '店铺所在地' : df['店铺所在地'],'消费金额':df['消费金额'],
#          '菜品名称':df['菜品名称'],'菜品单价':df['价格_y'],
#          '消费数量（单个菜品）':df['数量'],'菜品成本' : df['成本'],
#          '菜品类别':df['菜品类别'],'菜品口味':df['菜品口味'],
#          '点餐时间':df['点餐时间']}
# hotel = pd.DataFrame(hotel_list)
# hotel.to_csv('整合三表数据.csv',sep='\t',index=None)

# 按照店铺名分组
# for name,group in hotel.groupby('店铺名') :
#     group.dropna()
#     group.drop('店铺名', axis=1, inplace=True)     # 删除店铺名
#     group.sort_values(by="点餐时间", axis=0, ascending=True, inplace=True)  # 按点餐时间先后排序
#     group.to_csv('./data1/'+ name + '.txt',sep='\t',index=None) # 使用店铺名命名

# 确定一共有多少个店铺名称以及多少种菜品类别
# df3 = pd.read_csv('data/整合三表数据.csv', sep='\t')
# h_name = set(df3['店铺名'])
# d_name = set(df3['菜品类别'])
# print('共有%s家店铺'%len(h_name),'，共有%s个菜品类别'%len(set(d_name)))










# 以下内容是大作业静态网页数据生成

# for i in df3.index :
#     df3.loc[i,'消费日期'] = pd.to_datetime(str(df3.loc[i,'点餐时间'])[:-9])
# date_sale = df3
# print(date_sale)
# df_new = date_sale[['店铺名','店铺所在地','消费日期','菜品类别','消费金额','消费数量（单个菜品）']]
# df_group = df_new.groupby(['店铺名','店铺所在地','菜品类别','消费日期']).sum()
# print(df_group)
# for name in h_name :
#     data = df_group.loc[name,:]
#     data.to_csv('./data/'+name+'.txt',sep='\t')

# data_all = pd.read_csv('整合三表数据.csv', sep='\t')
# class_name = input('请输入你要查询的菜品类别:')
# vip_name = set(list(data_all ['会员名称']))
# data_solve = data_all [['菜品类别', '会员名称', '消费金额']]
# data = data_solve.groupby(['菜品类别', '会员名称']).sum()
# list_vip = data.loc [class_name, :]
# print(list_vip)

# 查询某个店铺某个菜品销量占菜品种类总销量的份额
# h_name = input('请输入你要查询的店铺:')
# class_name = input('请输入你要查询的菜品类别:')
# data_all = pd.read_csv(h_name + '.txt', sep='\t')
# data = data_all [['菜品类别', '菜品名称', '消费金额']]
# data = data.groupby(['菜品类别', '菜品名称']).sum()
# print(data.all())
# list_dish = data.loc [class_name, :]
# print(list_dish)

# 订单号、会员名、销量、单价，消费金额
# dict = []
# data_all = pd.read_csv('整合三表数据.csv', sep='\t')
# for i in range(len(data_all)) :
#     item = {'order' : data_all.loc [i, '订单号'],
#             'vip_name' : data_all.loc [i, '会员名称'],
#             'sale_num' : data_all.loc [i, '消费数量（单个菜品）'],
#             'price' : data_all.loc [i, '菜品单价'],
#             'sale_money' : data_all.loc [i, '消费金额'], }
#     dict.append(item)
#     print(str(item) + ',')
