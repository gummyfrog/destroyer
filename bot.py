import discord
import requests
import webbrowser
import time
import json
import string
string.letters = "abcdefghijklmnopqrstuvwxyz123456789!?@#$%^&"
import random
from selenium import webdriver

with open('../codes/destroyer/code.json') as f:
    codes = json.load(f)

from bs4 import BeautifulSoup

client = discord.Client()

@client.event
async def on_message(message):
    if message.author == client.user:
       return

    if message.author.id == "365975655608745985" and len(message.embeds) != 0:
        print("got message from poke cord...")
        print(message.embeds)
        print(len(message.embeds))
        first = message.embeds[0]
        print(message.embeds)
        print(first)
        if first["title"] == "\u200c\u200cA wild pokémon has appeared!":
            image = first["image"]
            soup = getImageSoup(image["url"])
            
            name = (soup.select_one('.kno-ecr-pt > span:nth-of-type(1)').get_text(strip=True))

            print(name)

            await client.send_message(message.channel, "p!catch " + name)
 


    if len(message.attachments) != 0:
        soup = getImageSoup(message.attachments[0]["url"])

        name = (soup.select_one('#topstuff > div > div.r5a77d > a').get_text(strip=True))

        await client.send_message(message.channel, "that is a " + name + "...")
 

def getImageSoup(message):
    filename = random.choice(string.letters) + random.choice(string.letters) + random.choice(string.letters) + '.jpg'
    print(filename)
    img_data = requests.get(message).content
    with open(filename, 'wb') as handler:
        handler.write(img_data)

    filePath = './' + filename
    searchUrl = 'http://www.google.hr/searchbyimage/upload'
    multipart = {'encoded_image': (filePath, open(filePath, 'rb')), 'image_content': ''}
    response = requests.post(searchUrl, files=multipart, allow_redirects=False)
    fetchUrl = response.headers['Location']
    print(fetchUrl)

    browser = webdriver.Chrome()

    browser.get(fetchUrl)
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    return soup


@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)


client.run(codes.token)
