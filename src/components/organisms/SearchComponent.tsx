import _ from 'lodash';
import { faker } from '@faker-js/faker';
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
            return { ...state, value: action.selection }

        default:
            throw new Error()
    }
}
const resultRenderer = ({ name }: any) => <Label content={name} />

function SearchComponent() {
    const characterList = useSelector((state: any) => state.characterSlice.characterList);
    let characterSearch = useSelector((state:any)=>state.characterSearchSlice.searchList)
    const source = characterList;
    let arrSource =[...source];
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state
    console.log("search",characterSearch)
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

            // const re = new RegExp(_.escapeRegExp(data.value), 'i')
            // const isMatch = (result: any) => re.test(result.name)
            dispatch({
                type: 'FINISH_SEARCH',
                results:arrSource.filter(function(el){
                    return el.name.toLowerCase().includes(data.value)
                })
            })

        }, 300)
    }

    useEffect(()=>{
        store.dispatch(getCharacterSearch(results));
    },[value])

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    return (

                <Search
                    loading={loading}
                    onResultSelect={(e, data) =>{
                        console.log("dselect",data.result.name)
                        dispatch({ type: 'UPDATE_SELECTION', selection: data.result.name });
                    }
                    }
                    onSearchChange={handleSearchChange}
                    resultRenderer={resultRenderer}
                    results={results}
                    value={value}
                />

    )
}

export default SearchComponent