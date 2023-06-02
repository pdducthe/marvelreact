import _ from 'lodash';
import { faker, fi } from '@faker-js/faker';
import React, { useEffect, useRef, useState } from 'react'
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'
import { store } from '../../store/configStore';
import { fetchCharacterList, fetchCharacterListAll, fetchCharacterSearch, getCharacterSearch } from '../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import CharacterSearch from '../../pages/CharacterSearch';

const initialState = {
    loading: false,
    results: [],
    value: '',
}

function exampleReducer(state: any, action: any) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            store.dispatch(getCharacterSearch({list:action.results,reset:false}))
            return { ...state, results: action.results }
        default:
            throw new Error()
    }
}

function handleSelection() {
    // console.log("on mouse down")
}

const resultRenderer = ({ name }: any) => <Label content={name} />

function SearchComponent(props: any) {
    const [state, dispatch] = React.useReducer(exampleReducer, initialState);
    const { loading, results, value } = state;
    const [suggestData, setSuggestData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const dispatchA = useDispatch();
    type Timer = ReturnType<typeof setTimeout>;
    const timeoutRef = React.useRef<any>(null);

    useEffect(() => {
        if (searchInput !== '') {
            localStorage.setItem("searchInput", searchInput) //save input value to localstorage for later use
            store.dispatch(fetchCharacterSearch({ name: searchInput, offset: 0 })); 
        } else if (searchInput === '') {
            console.log("empty query")
            store.dispatch(getCharacterSearch({list:[]}))
        }
        //props received from HeaderDesktop component, trying to setState for it out of useEffect will cause a race if HeaderDesktop is also re-rendering
        setSuggestData(props.data)
        //set offset store true as changing input
        store.dispatch(getCharacterSearch({list:[],reset:true}))
    }, [searchInput])

    //load data for suggestion from props (header desktop)
    useEffect(() => {
        dispatch({
            type: 'FINISH_SEARCH',
            results: props.data
        })
    }, [props])

    const handleSearchChange = React.useCallback((e: any, data: any) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })
        setSearchInput(data.value)
        timeoutRef.current = setTimeout(async () => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }

            // dispatch({
            //     type: 'FINISH_SEARCH',
            //     results: props.data
            //     // results: searchSuggest.filter(function (el: any) {
            //     //     return el.name.toLowerCase().includes(data.value.toLowerCase().trim())
            // })
        }, 1000)
    }, [searchInput])

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (

        <Search
            size={props.size.size == 0 ? 'small' : 'large'}
            loading={loading}
            onResultSelect={(e, data) => {
                dispatch({
                    type: 'UPDATE_SELECTION',
                    results: props.data.filter((obj: any) => {
                        //"name" property: its value contains "anyname" =>the value have  ".." Double quotation marks && name
                        return obj.name.toLowerCase().includes(`${data.result.name}`.toLowerCase().trim());
                    })
                });

            }}
            onMouseDown={handleSelection}
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
            placeholder={'Search...'}

        />

    )
}

export default SearchComponent