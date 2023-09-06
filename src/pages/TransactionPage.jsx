import React, { useEffect, useState } from 'react';
import { UserApi } from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setTransactions, } from '../redux/mainSlice';

import MainLayout from '../layout/MainLayout';
import CardUser from '../components/CardUser';
import CardTransaction from '../components/CardTransaction';

const TransactionPage = () => {
    const dispatch = useDispatch();

    const transactions = useSelector((state) => state.main.transactions);
    const token = useSelector((state) => state.persistedAuthentication.token);

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreTransactions, setHasMoreTransactions] = useState(true);

    const loadMoreTransactions = () => {
        if (hasMoreTransactions && !isLoading) {
            setIsLoading(true);
            UserApi.fetchTransactionHistory(token, offset, limit)
                .then((response) => {
                    const newTransactions = response.data.data.records;
                    dispatch(setTransactions([...transactions, ...newTransactions]));

                    if (newTransactions.length < limit) {
                        setHasMoreTransactions(false);
                    }

                    setOffset(offset + limit);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        loadMoreTransactions();
    }, [dispatch, token]);

    return (
        <MainLayout>
            <CardUser />
            <div className='relative my-6 max-w-[1248px] mx-auto'>
                <h2 className='font-semibold'>Semua Transaksi</h2>
                <div className='mt-4 grid grid-cols-1 gap-4'>
                    {transactions && transactions.length > 0 ? (
                        transactions.map((hasil, i) => (
                            <CardTransaction
                                key={i}
                                type={hasil.transaction_type}
                                nominal={hasil.total_amount}
                                date={hasil.created_on}
                                description={hasil.description}
                            />
                        ))
                    ) : ''}
                </div>
                {hasMoreTransactions && (
                    <div className='mt-4 flex justify-center'>
                        <button
                            className='text-sm font-semibold text-red-600'
                            onClick={loadMoreTransactions}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Show more'}
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TransactionPage;
