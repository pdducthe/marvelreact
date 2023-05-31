import _ from 'lodash';
import { faker, fi } from '@faker-js/faker';
import React, { useEffect, useRef, useState } from 'react'
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'
import { store } from '../../store/configStore';
import { fetchCharacterList, fetchCharacterListAll, fetchCharacterSearch, getCharacterSearch } from '../../store/reducers';
import { useSelector } from 'react-redux';

(() => {
    // store.dispatch(fetchCharacterList({ limit: 100, offset: 0 }));
    // store.dispatch(fetchCharacterListAll());
})()
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
            // console.log("VALUE INPUT",action.query)
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            console.log("RESULTS FINISH", action.results)
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            return { ...state, results: action.results }

        default:
            throw new Error()
    }
}
const resultRenderer = ({ name }: any) => <Label content={name} />

function SearchComponent(size: any) {
    let source: any = store.getState().characterSearchSlice.searchList;
    const [suggestData, setSuggestData] = useState(source);
    const [state, dispatch] = React.useReducer(exampleReducer, initialState);
    const { loading, results, value } = state;
    const [searchInput, setSearchInput] = useState(state.value)
    type Timer = ReturnType<typeof setTimeout>
    const timeoutRef = React.useRef<any>(null);

    useEffect(() => {
        if (searchInput !== '') {
            store.dispatch(fetchCharacterSearch({ name: searchInput, offset: 0 }));
            localStorage.setItem("searchInput", searchInput) //save input value to localstorage
        }
    }, [searchInput])

    useEffect(() => {
        store.dispatch(getCharacterSearch(results));
    }, [results])

    console.log("SOURCE CHANGE or NOT", source)
    // const handleSearchChange = React.useCallback((e: any, data: any) => {
    const handleSearchChange = (e: any, data: any) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })
        timeoutRef.current = setTimeout(async () => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }
            setSearchInput(data.value)
            console.log("STOREFOR SUGGEST", source)
            // store.dispatch(fetchCharacterSearch(data.value))
            dispatch({
                type: 'FINISH_SEARCH',
                results: source.filter(function (el: any) {
                    return el.name.toLowerCase().includes(data.value.toLowerCase().trim())
                })
            })
        }, 1000)
    }

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (

        <Search
            size={size.size.size == 0 ? 'small' : 'large'}
            loading={loading}
            onResultSelect={(e, data) => {
                dispatch({
                    type: 'UPDATE_SELECTION',
                    results: suggestData.filter((obj: any) => {
                        //"name" property: its value contains "anyname" =>the value have  ".." Double quotation marks && name
                        return obj.name.toLowerCase().includes(`${data.result.name}`.toLowerCase().trim());
                    })
                });
            }}
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
            placeholder='Search .....'
        // showNoResults={false}
        />

    )
}

export default SearchComponent