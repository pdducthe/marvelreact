import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react'
import { AppDispatch } from '../../store/configStore';
import { fetchCharacterList } from '../../store/reducers';

interface Page {
    limit: any,
    offset: any
}

function PaginationComponent(props: any) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pageId } = useParams();
    const [characterPerPage, setCharacterPerPage] = useState(100);
    const [activePage, setActivePage] = useState(1);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const characterTotal = useSelector((state: any) => state.characterSlice.total);
    const [totalCharacter] = useState(characterTotal);

    const totalPage = Math.ceil(characterTotal / characterPerPage);

    const onChange = (e: any, { activePage }: any) => {
        setActivePage(activePage);
        navigate(`/list/page/${activePage}`);
        setCurrentPage(activePage * characterPerPage - characterPerPage);
    }
    //take current page from Pagination component
    useEffect(() => {
        props.handleCallback({
            limit: characterPerPage,
            offset: currentPage
        })
        dispatch(fetchCharacterList({ limit: 100, offset: currentPage }));

    }, [activePage])


    return (
        <div>
            <Pagination  totalPages={totalPage} activePage={activePage} onPageChange={onChange} current={activePage} limit={characterPerPage} offset={currentPage} >
            </Pagination>
        </div>
    )
}

export default PaginationComponent