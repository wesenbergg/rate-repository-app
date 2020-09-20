import React from 'react';
import { RepositoryListContainer } from '../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { debug, getByTestId, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      
      expect(getAllByTestId('fullName').length).toBe(repositories.edges.length);

      expect(getAllByTestId('fullName')[0]).toHaveTextContent('jaredpalmer/formik'); //First item
      expect(getAllByTestId('description')[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(getAllByTestId('language')[0]).toHaveTextContent('TypeScript');

      const details = getAllByTestId('detailBoxHeader');
      expect(details.length).toBe(repositories.edges.length * 4); //4 detail box per list item
      expect(details[0]).toHaveTextContent('21.9K');
      expect(details[1]).toHaveTextContent('1.6K');
      expect(details[2]).toHaveTextContent('3');
      expect(details[3]).toHaveTextContent('88');


      expect(getAllByTestId('fullName')[1]).toHaveTextContent('async-library/react-async'); //Second item
      expect(getAllByTestId('description')[1]).toHaveTextContent('Flexible promise-based React data loader');
      expect(getAllByTestId('language')[1]).toHaveTextContent('JavaScript');

      expect(details[4]).toHaveTextContent('1.8K');
      expect(details[5]).toHaveTextContent('69');
      expect(details[6]).toHaveTextContent('3');
      expect(details[7]).toHaveTextContent('72');
    });
  });
});