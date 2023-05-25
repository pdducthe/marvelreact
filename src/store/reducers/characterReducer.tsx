import { combineReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface CharacterList {
  characterList: Array<any>,
  error: Object,
  status: String,
  characterInfo: Array<any>,
  searchList: Array<any>
}

const initialState: CharacterList = {
  characterList: [],
  error: {},
  status: 'idle',
  characterInfo: [],
  searchList: [],
}

const baseURL = `${process.env.REACT_APP_API_MARVEL_SERVER}`;
const publickey = `${process.env.REACT_APP_PUBLIC_KEY}`;
const privatekey = `${process.env.REACT_APP_PRIVATE_KEY}`;
const ts = new Date().getTime();
const md5 = require('md5');
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const url = baseURL + '?' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

export const fetchCharacterList = createAsyncThunk(
  'character/fetchList',
  async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: url,
      })
      // console.log("RESPONSE", res.data.data.results)
      return res.data.data.results
    } catch (err: any) {
      return err.response
    }
  }
)

export const fetchCharacterListById = createAsyncThunk(
  'character/fetchDetail',
  async (characterId: any) => {
    try {
      const res = await axios({
        method: 'GET',
        url: baseURL + '/' + characterId + '?' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash
      })
      return res.data.data.results
    } catch (err: any) {
      return err.response
    }
  }
)

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    getCharacterList(state, action) { },
  },
  extraReducers: {
    [fetchCharacterList.pending.type]: (state, action) => {
      state.status = 'loading';
      state.characterList = [];
    },
    [fetchCharacterList.fulfilled.type]: (state, action) => {
      state.characterList = action.payload;
      state.status = 'successful';
    },
    [fetchCharacterList.rejected.type]: (state, action) => {
      state.characterList = [];
      state.status = 'failed';
      state.error = action;
    }
  },
})

const characterIdSlice = createSlice({
  name: 'charactersId',
  initialState,
  reducers: {
    getCharacterInfo(state, action) { },
  },
  extraReducers: {
    [fetchCharacterListById.pending.type]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCharacterListById.fulfilled.type]: (state, action) => {
      state.characterInfo = action.payload;
      state.status = 'successful';
    },
    [fetchCharacterListById.rejected.type]: (state, action) => {
      state.status = 'failed';
      state.error = action;
    }
  },
})

const characterSearchSlice = createSlice({
  name: 'characterSearch',
  initialState,
  reducers: {
    getCharacterSearch(state, action) {
      state.searchList = action.payload;
      state.status = 'successful';
    },
  },
})





export const { getCharacterList } = characterSlice.actions;
export const { getCharacterInfo } = characterIdSlice.actions;
export const {getCharacterSearch} = characterSearchSlice.actions;
export default combineReducers({
  characterSlice: characterSlice.reducer,
  characterIdSlice: characterIdSlice.reducer,
  characterSearchSlice: characterSearchSlice.reducer
})


