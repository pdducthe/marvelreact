import _ from 'lodash';
import { faker, fi } from '@faker-js/faker';
import React, { useEffect, useRef } from 'react'
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'
import { store } from '../../store/configStore';
import { fetchCharacterList, getCharacterSearch } from '../../store/reducers';
import { useSelector } from 'react-redux';

(() => {
    store.dispatch(fetchCharacterList());
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
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            return { ...state, results: action.results }

        default:
            throw new Error()
    }
}
const resultRenderer = ({ name }: any) => <Label content={name} />

function SearchComponent(size: any) {
    const characterList = useSelector((state: any) => state.characterSlice.characterList);
    const source = characterList;
    let arrSource = [...source];
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state
    type Timer = ReturnType<typeof setTimeout>
    const timeoutRef = React.useRef<any>(null);
    // const handleSearchChange = React.useCallback((e: any, data: any) => {
    const handleSearchChange = (e: any, data: any) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })
        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }
            //this function cannot be applied, because typescript cause isssue with type
            // const re = new RegExp(_.escapeRegExp(data.value), 'i')
            // const isMatch = (result: any) => re.test(result.name)
            dispatch({
                type: 'FINISH_SEARCH',
                results: source.filter(function (el: any) {
                    return el.name.toLowerCase().includes(data.value.toLowerCase().trim())
                })
            })

        }, 300)
    }

    useEffect(() => {
        store.dispatch(getCharacterSearch(results));
    }, [results])

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
                    results: source.filter((obj: any) => {
                        //"name" property: its value contains "anyname" =>the value have  ".." Double quotation marks && name
                        //too exhausting and wasting time with this bug
                        return obj.name.toLowerCase().includes(`${data.result.name}`.toLowerCase().trim());
                    })
                });
            }}
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
        />

    )
}

export default SearchComponent