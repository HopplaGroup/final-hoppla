/* eslint-disable */
import type { Prisma, UserUserFavorite } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateUserUserFavorite(options?: Omit<(UseMutationOptions<(UserUserFavorite | undefined), DefaultError, Prisma.UserUserFavoriteCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserUserFavoriteCreateArgs, DefaultError, UserUserFavorite, true>('UserUserFavorite', 'POST', `${endpoint}/userUserFavorite/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUserFavoriteCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUserFavoriteCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, UserUserFavorite, Prisma.UserUserFavoriteGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.UserUserFavoriteCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, UserUserFavorite, Prisma.UserUserFavoriteGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyUserUserFavorite(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserUserFavoriteCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserUserFavoriteCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('UserUserFavorite', 'POST', `${endpoint}/userUserFavorite/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUserFavoriteCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUserFavoriteCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.UserUserFavoriteCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyUserUserFavorite<TArgs extends Prisma.UserUserFavoriteFindManyArgs, TQueryFnData = Array<Prisma.UserUserFavoriteGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/findMany`, args, options, fetch);
}

export function useInfiniteFindManyUserUserFavorite<TArgs extends Prisma.UserUserFavoriteFindManyArgs, TQueryFnData = Array<Prisma.UserUserFavoriteGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/findMany`, args, options, fetch);
}

export function useSuspenseFindManyUserUserFavorite<TArgs extends Prisma.UserUserFavoriteFindManyArgs, TQueryFnData = Array<Prisma.UserUserFavoriteGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyUserUserFavorite<TArgs extends Prisma.UserUserFavoriteFindManyArgs, TQueryFnData = Array<Prisma.UserUserFavoriteGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/findMany`, args, options, fetch);
}

export function useFindUniqueUserUserFavorite<TArgs extends Prisma.UserUserFavoriteFindUniqueArgs, TQueryFnData = Prisma.UserUserFavoriteGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueUserUserFavorite<TArgs extends Prisma.UserUserFavoriteFindUniqueArgs, TQueryFnData = Prisma.UserUserFavoriteGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/findUnique`, args, options, fetch);
}

export function useFindFirstUserUserFavorite<TArgs extends Prisma.UserUserFavoriteFindFirstArgs, TQueryFnData = Prisma.UserUserFavoriteGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstUserUserFavorite<TArgs extends Prisma.UserUserFavoriteFindFirstArgs, TQueryFnData = Prisma.UserUserFavoriteGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/findFirst`, args, options, fetch);
}

export function useUpdateUserUserFavorite(options?: Omit<(UseMutationOptions<(UserUserFavorite | undefined), DefaultError, Prisma.UserUserFavoriteUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserUserFavoriteUpdateArgs, DefaultError, UserUserFavorite, true>('UserUserFavorite', 'PUT', `${endpoint}/userUserFavorite/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUserFavoriteUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUserFavoriteUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, UserUserFavorite, Prisma.UserUserFavoriteGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.UserUserFavoriteUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, UserUserFavorite, Prisma.UserUserFavoriteGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyUserUserFavorite(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserUserFavoriteUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserUserFavoriteUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('UserUserFavorite', 'PUT', `${endpoint}/userUserFavorite/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUserFavoriteUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUserFavoriteUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.UserUserFavoriteUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertUserUserFavorite(options?: Omit<(UseMutationOptions<(UserUserFavorite | undefined), DefaultError, Prisma.UserUserFavoriteUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserUserFavoriteUpsertArgs, DefaultError, UserUserFavorite, true>('UserUserFavorite', 'POST', `${endpoint}/userUserFavorite/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUserFavoriteUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUserFavoriteUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, UserUserFavorite, Prisma.UserUserFavoriteGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.UserUserFavoriteUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, UserUserFavorite, Prisma.UserUserFavoriteGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteUserUserFavorite(options?: Omit<(UseMutationOptions<(UserUserFavorite | undefined), DefaultError, Prisma.UserUserFavoriteDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserUserFavoriteDeleteArgs, DefaultError, UserUserFavorite, true>('UserUserFavorite', 'DELETE', `${endpoint}/userUserFavorite/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUserFavoriteDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUserFavoriteDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, UserUserFavorite, Prisma.UserUserFavoriteGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.UserUserFavoriteDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, UserUserFavorite, Prisma.UserUserFavoriteGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyUserUserFavorite(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserUserFavoriteDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserUserFavoriteDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('UserUserFavorite', 'DELETE', `${endpoint}/userUserFavorite/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserUserFavoriteDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserUserFavoriteDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.UserUserFavoriteDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateUserUserFavorite<TArgs extends Prisma.UserUserFavoriteAggregateArgs, TQueryFnData = Prisma.GetUserUserFavoriteAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateUserUserFavorite<TArgs extends Prisma.UserUserFavoriteAggregateArgs, TQueryFnData = Prisma.GetUserUserFavoriteAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/aggregate`, args, options, fetch);
}

export function useGroupByUserUserFavorite<TArgs extends Prisma.UserUserFavoriteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.UserUserFavoriteGroupByArgs['orderBy'] } : { orderBy?: Prisma.UserUserFavoriteGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.UserUserFavoriteGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.UserUserFavoriteGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.UserUserFavoriteGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.UserUserFavoriteGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.UserUserFavoriteGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByUserUserFavorite<TArgs extends Prisma.UserUserFavoriteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.UserUserFavoriteGroupByArgs['orderBy'] } : { orderBy?: Prisma.UserUserFavoriteGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.UserUserFavoriteGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.UserUserFavoriteGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.UserUserFavoriteGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.UserUserFavoriteGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.UserUserFavoriteGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/groupBy`, args, options, fetch);
}

export function useCountUserUserFavorite<TArgs extends Prisma.UserUserFavoriteCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.UserUserFavoriteCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/count`, args, options, fetch);
}

export function useSuspenseCountUserUserFavorite<TArgs extends Prisma.UserUserFavoriteCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.UserUserFavoriteCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserUserFavoriteCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/count`, args, options, fetch);
}

export function useCheckUserUserFavorite<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; userId?: string; favoriteId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('UserUserFavorite', `${endpoint}/userUserFavorite/check`, args, options, fetch);
}
