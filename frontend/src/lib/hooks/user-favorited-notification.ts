/* eslint-disable */
import type { Prisma, UserFavoritedNotification } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateUserFavoritedNotification(options?: Omit<(UseMutationOptions<(UserFavoritedNotification | undefined), DefaultError, Prisma.UserFavoritedNotificationCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserFavoritedNotificationCreateArgs, DefaultError, UserFavoritedNotification, true>('UserFavoritedNotification', 'POST', `${endpoint}/userFavoritedNotification/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserFavoritedNotificationCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, UserFavoritedNotification, Prisma.UserFavoritedNotificationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, UserFavoritedNotification, Prisma.UserFavoritedNotificationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyUserFavoritedNotification(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserFavoritedNotificationCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserFavoritedNotificationCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('UserFavoritedNotification', 'POST', `${endpoint}/userFavoritedNotification/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserFavoritedNotificationCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationFindManyArgs, TQueryFnData = Array<Prisma.UserFavoritedNotificationGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/findMany`, args, options, fetch);
}

export function useInfiniteFindManyUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationFindManyArgs, TQueryFnData = Array<Prisma.UserFavoritedNotificationGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/findMany`, args, options, fetch);
}

export function useSuspenseFindManyUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationFindManyArgs, TQueryFnData = Array<Prisma.UserFavoritedNotificationGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationFindManyArgs, TQueryFnData = Array<Prisma.UserFavoritedNotificationGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/findMany`, args, options, fetch);
}

export function useFindUniqueUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationFindUniqueArgs, TQueryFnData = Prisma.UserFavoritedNotificationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationFindUniqueArgs, TQueryFnData = Prisma.UserFavoritedNotificationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/findUnique`, args, options, fetch);
}

export function useFindFirstUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationFindFirstArgs, TQueryFnData = Prisma.UserFavoritedNotificationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationFindFirstArgs, TQueryFnData = Prisma.UserFavoritedNotificationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/findFirst`, args, options, fetch);
}

export function useUpdateUserFavoritedNotification(options?: Omit<(UseMutationOptions<(UserFavoritedNotification | undefined), DefaultError, Prisma.UserFavoritedNotificationUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserFavoritedNotificationUpdateArgs, DefaultError, UserFavoritedNotification, true>('UserFavoritedNotification', 'PUT', `${endpoint}/userFavoritedNotification/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserFavoritedNotificationUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, UserFavoritedNotification, Prisma.UserFavoritedNotificationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, UserFavoritedNotification, Prisma.UserFavoritedNotificationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyUserFavoritedNotification(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserFavoritedNotificationUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserFavoritedNotificationUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('UserFavoritedNotification', 'PUT', `${endpoint}/userFavoritedNotification/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserFavoritedNotificationUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertUserFavoritedNotification(options?: Omit<(UseMutationOptions<(UserFavoritedNotification | undefined), DefaultError, Prisma.UserFavoritedNotificationUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserFavoritedNotificationUpsertArgs, DefaultError, UserFavoritedNotification, true>('UserFavoritedNotification', 'POST', `${endpoint}/userFavoritedNotification/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserFavoritedNotificationUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, UserFavoritedNotification, Prisma.UserFavoritedNotificationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, UserFavoritedNotification, Prisma.UserFavoritedNotificationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteUserFavoritedNotification(options?: Omit<(UseMutationOptions<(UserFavoritedNotification | undefined), DefaultError, Prisma.UserFavoritedNotificationDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserFavoritedNotificationDeleteArgs, DefaultError, UserFavoritedNotification, true>('UserFavoritedNotification', 'DELETE', `${endpoint}/userFavoritedNotification/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserFavoritedNotificationDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, UserFavoritedNotification, Prisma.UserFavoritedNotificationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, UserFavoritedNotification, Prisma.UserFavoritedNotificationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyUserFavoritedNotification(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.UserFavoritedNotificationDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.UserFavoritedNotificationDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('UserFavoritedNotification', 'DELETE', `${endpoint}/userFavoritedNotification/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.UserFavoritedNotificationDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.UserFavoritedNotificationDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationAggregateArgs, TQueryFnData = Prisma.GetUserFavoritedNotificationAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationAggregateArgs, TQueryFnData = Prisma.GetUserFavoritedNotificationAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/aggregate`, args, options, fetch);
}

export function useGroupByUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.UserFavoritedNotificationGroupByArgs['orderBy'] } : { orderBy?: Prisma.UserFavoritedNotificationGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.UserFavoritedNotificationGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.UserFavoritedNotificationGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.UserFavoritedNotificationGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.UserFavoritedNotificationGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.UserFavoritedNotificationGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.UserFavoritedNotificationGroupByArgs['orderBy'] } : { orderBy?: Prisma.UserFavoritedNotificationGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.UserFavoritedNotificationGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.UserFavoritedNotificationGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.UserFavoritedNotificationGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.UserFavoritedNotificationGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.UserFavoritedNotificationGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/groupBy`, args, options, fetch);
}

export function useCountUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.UserFavoritedNotificationCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/count`, args, options, fetch);
}

export function useSuspenseCountUserFavoritedNotification<TArgs extends Prisma.UserFavoritedNotificationCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.UserFavoritedNotificationCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.UserFavoritedNotificationCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/count`, args, options, fetch);
}

export function useCheckUserFavoritedNotification<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; userId?: string; type?: string; favouritedById?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('UserFavoritedNotification', `${endpoint}/userFavoritedNotification/check`, args, options, fetch);
}
