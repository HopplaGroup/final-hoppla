/* eslint-disable */
import type { Prisma, RidePassengerRequest } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateRidePassengerRequest(options?: Omit<(UseMutationOptions<(RidePassengerRequest | undefined), DefaultError, Prisma.RidePassengerRequestCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerRequestCreateArgs, DefaultError, RidePassengerRequest, true>('RidePassengerRequest', 'POST', `${endpoint}/ridePassengerRequest/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerRequestCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerRequestCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RidePassengerRequest, Prisma.RidePassengerRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerRequestCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RidePassengerRequest, Prisma.RidePassengerRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyRidePassengerRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RidePassengerRequestCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerRequestCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('RidePassengerRequest', 'POST', `${endpoint}/ridePassengerRequest/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerRequestCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerRequestCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerRequestCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestFindManyArgs, TQueryFnData = Array<Prisma.RidePassengerRequestGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/findMany`, args, options, fetch);
}

export function useInfiniteFindManyRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestFindManyArgs, TQueryFnData = Array<Prisma.RidePassengerRequestGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/findMany`, args, options, fetch);
}

export function useSuspenseFindManyRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestFindManyArgs, TQueryFnData = Array<Prisma.RidePassengerRequestGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestFindManyArgs, TQueryFnData = Array<Prisma.RidePassengerRequestGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/findMany`, args, options, fetch);
}

export function useFindUniqueRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestFindUniqueArgs, TQueryFnData = Prisma.RidePassengerRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestFindUniqueArgs, TQueryFnData = Prisma.RidePassengerRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/findUnique`, args, options, fetch);
}

export function useFindFirstRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestFindFirstArgs, TQueryFnData = Prisma.RidePassengerRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestFindFirstArgs, TQueryFnData = Prisma.RidePassengerRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/findFirst`, args, options, fetch);
}

export function useUpdateRidePassengerRequest(options?: Omit<(UseMutationOptions<(RidePassengerRequest | undefined), DefaultError, Prisma.RidePassengerRequestUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerRequestUpdateArgs, DefaultError, RidePassengerRequest, true>('RidePassengerRequest', 'PUT', `${endpoint}/ridePassengerRequest/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerRequestUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerRequestUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RidePassengerRequest, Prisma.RidePassengerRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerRequestUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RidePassengerRequest, Prisma.RidePassengerRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyRidePassengerRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RidePassengerRequestUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerRequestUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('RidePassengerRequest', 'PUT', `${endpoint}/ridePassengerRequest/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerRequestUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerRequestUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerRequestUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertRidePassengerRequest(options?: Omit<(UseMutationOptions<(RidePassengerRequest | undefined), DefaultError, Prisma.RidePassengerRequestUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerRequestUpsertArgs, DefaultError, RidePassengerRequest, true>('RidePassengerRequest', 'POST', `${endpoint}/ridePassengerRequest/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerRequestUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerRequestUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RidePassengerRequest, Prisma.RidePassengerRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerRequestUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RidePassengerRequest, Prisma.RidePassengerRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteRidePassengerRequest(options?: Omit<(UseMutationOptions<(RidePassengerRequest | undefined), DefaultError, Prisma.RidePassengerRequestDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerRequestDeleteArgs, DefaultError, RidePassengerRequest, true>('RidePassengerRequest', 'DELETE', `${endpoint}/ridePassengerRequest/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerRequestDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerRequestDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RidePassengerRequest, Prisma.RidePassengerRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerRequestDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RidePassengerRequest, Prisma.RidePassengerRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyRidePassengerRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RidePassengerRequestDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerRequestDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('RidePassengerRequest', 'DELETE', `${endpoint}/ridePassengerRequest/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerRequestDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerRequestDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerRequestDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestAggregateArgs, TQueryFnData = Prisma.GetRidePassengerRequestAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestAggregateArgs, TQueryFnData = Prisma.GetRidePassengerRequestAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/aggregate`, args, options, fetch);
}

export function useGroupByRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RidePassengerRequestGroupByArgs['orderBy'] } : { orderBy?: Prisma.RidePassengerRequestGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RidePassengerRequestGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RidePassengerRequestGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RidePassengerRequestGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RidePassengerRequestGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RidePassengerRequestGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RidePassengerRequestGroupByArgs['orderBy'] } : { orderBy?: Prisma.RidePassengerRequestGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RidePassengerRequestGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RidePassengerRequestGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RidePassengerRequestGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RidePassengerRequestGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RidePassengerRequestGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/groupBy`, args, options, fetch);
}

export function useCountRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RidePassengerRequestCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/count`, args, options, fetch);
}

export function useSuspenseCountRidePassengerRequest<TArgs extends Prisma.RidePassengerRequestCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RidePassengerRequestCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerRequestCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/count`, args, options, fetch);
}
import type { RidePassengerRequestStatus } from '@zenstackhq/runtime/models';

export function useCheckRidePassengerRequest<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; passengerId?: string; rideId?: string; bogOrderId?: string; status?: RidePassengerRequestStatus; description?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('RidePassengerRequest', `${endpoint}/ridePassengerRequest/check`, args, options, fetch);
}
