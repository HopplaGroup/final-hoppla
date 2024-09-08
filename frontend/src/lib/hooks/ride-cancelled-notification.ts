/* eslint-disable */
import type { Prisma, RideCancelledNotification } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateRideCancelledNotification(options?: Omit<(UseMutationOptions<(RideCancelledNotification | undefined), DefaultError, Prisma.RideCancelledNotificationCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideCancelledNotificationCreateArgs, DefaultError, RideCancelledNotification, true>('RideCancelledNotification', 'POST', `${endpoint}/rideCancelledNotification/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideCancelledNotificationCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideCancelledNotificationCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideCancelledNotification, Prisma.RideCancelledNotificationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideCancelledNotificationCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideCancelledNotification, Prisma.RideCancelledNotificationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyRideCancelledNotification(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideCancelledNotificationCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideCancelledNotificationCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('RideCancelledNotification', 'POST', `${endpoint}/rideCancelledNotification/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideCancelledNotificationCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideCancelledNotificationCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideCancelledNotificationCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationFindManyArgs, TQueryFnData = Array<Prisma.RideCancelledNotificationGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/findMany`, args, options, fetch);
}

export function useInfiniteFindManyRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationFindManyArgs, TQueryFnData = Array<Prisma.RideCancelledNotificationGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/findMany`, args, options, fetch);
}

export function useSuspenseFindManyRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationFindManyArgs, TQueryFnData = Array<Prisma.RideCancelledNotificationGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationFindManyArgs, TQueryFnData = Array<Prisma.RideCancelledNotificationGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/findMany`, args, options, fetch);
}

export function useFindUniqueRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationFindUniqueArgs, TQueryFnData = Prisma.RideCancelledNotificationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationFindUniqueArgs, TQueryFnData = Prisma.RideCancelledNotificationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/findUnique`, args, options, fetch);
}

export function useFindFirstRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationFindFirstArgs, TQueryFnData = Prisma.RideCancelledNotificationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationFindFirstArgs, TQueryFnData = Prisma.RideCancelledNotificationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/findFirst`, args, options, fetch);
}

export function useUpdateRideCancelledNotification(options?: Omit<(UseMutationOptions<(RideCancelledNotification | undefined), DefaultError, Prisma.RideCancelledNotificationUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideCancelledNotificationUpdateArgs, DefaultError, RideCancelledNotification, true>('RideCancelledNotification', 'PUT', `${endpoint}/rideCancelledNotification/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideCancelledNotificationUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideCancelledNotificationUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideCancelledNotification, Prisma.RideCancelledNotificationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideCancelledNotificationUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideCancelledNotification, Prisma.RideCancelledNotificationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyRideCancelledNotification(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideCancelledNotificationUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideCancelledNotificationUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('RideCancelledNotification', 'PUT', `${endpoint}/rideCancelledNotification/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideCancelledNotificationUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideCancelledNotificationUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideCancelledNotificationUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertRideCancelledNotification(options?: Omit<(UseMutationOptions<(RideCancelledNotification | undefined), DefaultError, Prisma.RideCancelledNotificationUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideCancelledNotificationUpsertArgs, DefaultError, RideCancelledNotification, true>('RideCancelledNotification', 'POST', `${endpoint}/rideCancelledNotification/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideCancelledNotificationUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideCancelledNotificationUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideCancelledNotification, Prisma.RideCancelledNotificationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideCancelledNotificationUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideCancelledNotification, Prisma.RideCancelledNotificationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteRideCancelledNotification(options?: Omit<(UseMutationOptions<(RideCancelledNotification | undefined), DefaultError, Prisma.RideCancelledNotificationDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideCancelledNotificationDeleteArgs, DefaultError, RideCancelledNotification, true>('RideCancelledNotification', 'DELETE', `${endpoint}/rideCancelledNotification/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideCancelledNotificationDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideCancelledNotificationDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideCancelledNotification, Prisma.RideCancelledNotificationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideCancelledNotificationDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideCancelledNotification, Prisma.RideCancelledNotificationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyRideCancelledNotification(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideCancelledNotificationDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideCancelledNotificationDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('RideCancelledNotification', 'DELETE', `${endpoint}/rideCancelledNotification/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideCancelledNotificationDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideCancelledNotificationDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideCancelledNotificationDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationAggregateArgs, TQueryFnData = Prisma.GetRideCancelledNotificationAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationAggregateArgs, TQueryFnData = Prisma.GetRideCancelledNotificationAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/aggregate`, args, options, fetch);
}

export function useGroupByRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RideCancelledNotificationGroupByArgs['orderBy'] } : { orderBy?: Prisma.RideCancelledNotificationGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RideCancelledNotificationGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RideCancelledNotificationGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RideCancelledNotificationGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RideCancelledNotificationGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RideCancelledNotificationGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RideCancelledNotificationGroupByArgs['orderBy'] } : { orderBy?: Prisma.RideCancelledNotificationGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RideCancelledNotificationGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RideCancelledNotificationGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RideCancelledNotificationGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RideCancelledNotificationGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RideCancelledNotificationGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/groupBy`, args, options, fetch);
}

export function useCountRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RideCancelledNotificationCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/count`, args, options, fetch);
}

export function useSuspenseCountRideCancelledNotification<TArgs extends Prisma.RideCancelledNotificationCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RideCancelledNotificationCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideCancelledNotificationCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/count`, args, options, fetch);
}

export function useCheckRideCancelledNotification<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; userId?: string; type?: string; reason?: string; rideId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('RideCancelledNotification', `${endpoint}/rideCancelledNotification/check`, args, options, fetch);
}
