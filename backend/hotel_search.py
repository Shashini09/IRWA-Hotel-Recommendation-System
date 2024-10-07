import pandas as pd
import numpy as np
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pickle

# Load your hotel dataset (assuming a pickle file)
with open('contentsearchhotels.pkl', 'rb') as file:
    hotel = pickle.load(file)

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
