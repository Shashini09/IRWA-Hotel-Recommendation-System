import pandas as pd
import numpy as np
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pickle

# Load your hotel dataset (assuming a pickle file)
with open('contentsearchhotels.pkl', 'rb') as file:
    hotel = pickle.load(file)



room_no=[
     ('king',2),
   ('queen',2), 
    ('triple',3),
    ('master',3),
   ('family',4),
   ('murphy',2),
   ('quad',4),
   ('double-double',4),
   ('mini',2),
   ('studio',1),
    ('junior',2),
   ('apartment',4),
    ('double',2),
   ('twin',2),
   ('double-twin',4),
   ('single',1),
     ('diabled',1),
   ('accessible',1),
    ('suite',2),
    ('one',2)
   ]

def calc():
    guests_no=[]
    for i in range(hotel.shape[0]):
        temp=hotel['roomtype'][i].lower().split()
        flag=0
        for j in range(len(temp)):
            for k in range(len(room_no)):
                if temp[j]==room_no[k][0]:
                    guests_no.append(room_no[k][1])
                    flag=1
                    break
            if flag==1:
                break
        if flag==0:
            guests_no.append(2)
    hotel['guests_no']=guests_no

calc()



# Function to search hotels based on requirements
def requirementbased(city, number, features):
    hotel['city'] = hotel['city'].str.lower()
    hotel['roomamenities'] = hotel['roomamenities'].str.lower()
    features = features.lower()

    # Tokenize and clean the features input
    features_tokens = word_tokenize(features)
    sw = stopwords.words('english')
    lemm = WordNetLemmatizer()
    
    f1_set = {w for w in features_tokens if w not in sw}
    f_set = set(lemm.lemmatize(se) for se in f1_set)
    
    # Filter the dataset by city and number of guests
    reqbased = hotel[hotel['city'] == city.lower()]
    reqbased = reqbased[reqbased['guests_no'] == number]
    reqbased = reqbased.set_index(np.arange(reqbased.shape[0]))

    cos = []
    for i in range(reqbased.shape[0]):
        temp_tokens = word_tokenize(reqbased['roomamenities'][i])
        temp1_set = {w for w in temp_tokens if w not in sw}
        temp_set = set(lemm.lemmatize(se) for se in temp1_set)
        rvector = temp_set.intersection(f_set)
        cos.append(len(rvector))
    
    reqbased['similarity'] = cos
    reqbased = reqbased.sort_values(by='similarity', ascending=False)
    reqbased.drop_duplicates(subset='hotelcode', keep='first', inplace=True)

    return reqbased[['city', 'hotelname', 'roomtype', 'starrating', 'roomamenities', 'similarity']].head(8).to_dict(orient='records')
