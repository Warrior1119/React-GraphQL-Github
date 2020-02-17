import React from 'react';
import { useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useLoadMore } from 'react-load-more-hook';
import { SEARCH_REPOSITORIES } from '../queries/queries';
import Repo from './Repo';

const Repos = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [term, setTerm] = useState('');
  const ref = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useLoadMore(() => {
    loadMore();
  }, ref)

  const { loading, error, data, fetchMore } = useQuery(
    SEARCH_REPOSITORIES,
    {
      variables: { term: term, countPerPage: 10 },
    }
  );

  const searchRepos = (e) => {
    setTerm(searchKeyword);
  }

  const loadMore = () => {
    if (!data || !data.search || !data.search.repos) {
      return;
    }
    if (data.search.repos.length == 0) {
      return;
    }

    fetchMore({
      query: SEARCH_REPOSITORIES,
      variables: { term: term, countPerPage: 10, cursor: data.search.repos[data.search.repos.length - 1].cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        setIsLoadingMore(false); 
        return {
          search: {
            repos: [...prev.search.repos, ...fetchMoreResult.search.repos],
            __typename: prev.search.__typename
          },
        }
        
      }
    })
  }

  const renderRepoList = () => {
    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error :(</p>;

    if (!data || !data.search || !data.search.repos) {
      return <div></div>
    }

    return data.search.repos.map(({ repo }) => <Repo key={repo.id} repo={repo} />);
  }

  const renderLoadingMore = () => {
    if (isLoadingMore) {
      return <div className="loading-more">Loading More...</div>;
    }
    return null;
  }

  return (
    <div>
      <div className="search">
        <input 
          type="text" 
          value={searchKeyword} 
          onChange={(e) => setSearchKeyword(e.target.value)} 
        />
        <button onClick={searchRepos}>Search</button>
      </div>
      <ul className="repos" ref={ref}>
        {renderRepoList()}
        {renderLoadingMore()}
      </ul>
    </div>
  )
}


export default Repos;