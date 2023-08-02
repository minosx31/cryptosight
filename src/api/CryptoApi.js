import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.coingecko.com/api/v3';

export const CryptoApi = createApi({
    reducerPath: 'CryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCoinList: builder.query({
            query: (currency) => `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        }),
        getSingleCoin: builder.query({
            query: (id) => `/coins/${id}`
        }),
        getMarketCap: builder.query({
            query: (currency) => `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`
        }),
        getHistoricalChart: builder.query({
            query: ({id, currency, days}) => `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        }),
        getTrending: builder.query({
            query: () => `/search/trending`
        })
    })
})

export const {
    useGetCoinListQuery,
    useGetSingleCoinQuery,
    useGetMarketCapQuery,
    useGetHistoricalChartQuery,
    useGetTrendingQuery,
} = CryptoApi