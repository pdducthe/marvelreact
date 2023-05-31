import { combineReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface CharacterList {
  characterList: Array<any>,
  error: Object,
  status: String,
  characterInfo: Array<any>,
  searchList: Array<any>,
  total: number,
  searchTotal: number,
  searchValue: string,
  characterListAll: Array<any>,
}

const initialState: CharacterList = {
  characterList: [],
  error: {},
  status: 'idle',
  characterInfo: [],
  searchList: [],
  total: 0,
  searchTotal: 0,
  searchValue: '',
  characterListAll: [],
}

const baseURL = `${process.env.REACT_APP_API_MARVEL_SERVER}`;
const publickey = `${process.env.REACT_APP_PUBLIC_KEY}`;
const privatekey = `${process.env.REACT_APP_PRIVATE_KEY}`;
const ts = new Date().getTime();
const md5 = require('md5');
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const originUrl = baseURL + '?' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

export const fetchCharacterList = createAsyncThunk(
  'character/fetchList',
  async ({ limit, offset }: any) => {
    try {
      const res = await axios({
        method: 'GET',
        url: originUrl + `&limit=${limit}` + `&offset=${offset}`,
      })
      // console.log("MARVEL DATA",res)
      return res.data.data
    } catch (err: any) {
      return err.response
    }
  }
)

export const fetchCharacterSearch = createAsyncThunk(
  'character/fetchName',
  async ({ name, offset }: any) => {
    try {
      const res = await axios({
        method: 'GET',
        url: baseURL + '?' + `nameStartsWith=${name}` + `&limit=20` + `&offset=${offset}` + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash,
      })
      return res.data.data
    } catch (err: any) {
      return err.response
    }
  }
)

export const fetchCharacterListAll = createAsyncThunk(
  'character/fetchListAll',
  async () => {
    let arrayData: any = [];
    try {
      let myUrl = originUrl + `&limit=${100}`;
      let arraySum = [];
      for (let offset = 1; offset <= 16; offset++) {
        arraySum.push(`${myUrl}&offset=${offset}`)
      }

      Promise.all(
        arraySum.map(async item =>
          await axios.get(item)
            .then(resp => resp.data.data.results)
        ))
        .then(results => {
          arrayData = results
          // let arrayData: any = results
          return results.flat()
        })
        .catch(error => {
        })
      // arraySum.forEach((item) => {
      //   setTimeout(async () => {
      //     const res = await axios({
      //       method: 'GET',
      //       url: item
      //     })
      //     console.log("finalData", arrayData.flat())
      //     return arrayData.push(res.data.data.results);
      //   }, 100)
      // })

      // return arrayData
    }
    catch (err: any) {
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
      // console.log("action",action.payload)
      state.characterList = action.payload.results;
      state.total = action.payload.total;
      state.status = 'successful';
    },
    [fetchCharacterList.rejected.type]: (state, action) => {
      state.characterList = [];
      state.status = 'failed';
      state.error = action;
    }
  },
})

const characterAllSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    getCharacterListAll(state, action) { },
  },
  extraReducers: {
    [fetchCharacterListAll.pending.type]: (state, action) => {
      state.status = 'loading';
      state.characterListAll = [];
    },
    [fetchCharacterListAll.fulfilled.type]: (state, action) => {
      console.log("payload", action.payload)
      // state.characterListAll = action.payload.results;
      state.status = 'successful';
    },
    [fetchCharacterListAll.rejected.type]: (state, action) => {
      state.characterListAll = [];
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
      state.characterInfo = [];
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
  extraReducers: {
    [fetchCharacterSearch.pending.type]: (state, action) => {
      state.status = 'loading';
      state.searchList = [];
    },
    [fetchCharacterSearch.fulfilled.type]: (state, action) => {
      if (action.payload.results !== undefined) {
        // state.searchList = [...state.searchList,...action.payload.results];
        state.searchList = action.payload.results;
      } else {
        state.searchList = [];
      }
      state.searchTotal = action.payload.total;
      state.status = 'successfull';
    },
    [fetchCharacterSearch.rejected.type]: (state, action) => {
      state.searchList = [];
      state.status = 'failed';
      state.error = action;
    }
  },
})





export const { getCharacterList } = characterSlice.actions;
export const { getCharacterInfo } = characterIdSlice.actions;
export const { getCharacterSearch } = characterSearchSlice.actions;
export const { getCharacterListAll } = characterAllSlice.actions;

export default combineReducers({
  characterSlice: characterSlice.reducer,
  characterIdSlice: characterIdSlice.reducer,
  characterSearchSlice: characterSearchSlice.reducer,
  characterAllSlice: characterAllSlice.reducer,
})


