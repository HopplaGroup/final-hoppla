/* eslint-disable */
import type { Prisma, RidePassenger } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateRidePassenger(options?: Omit<(UseMutationOptions<(RidePassenger | undefined), DefaultError, Prisma.RidePassengerCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerCreateArgs, DefaultError, RidePassenger, true>('RidePassenger', 'POST', `${endpoint}/ridePassenger/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RidePassenger, Prisma.RidePassengerGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RidePassenger, Prisma.RidePassengerGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyRidePassenger(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RidePassengerCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('RidePassenger', 'POST', `${endpoint}/ridePassenger/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyRidePassenger<TArgs extends Prisma.RidePassengerFindManyArgs, TQueryFnData = Array<Prisma.RidePassengerGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/findMany`, args, options, fetch);
}

export function useInfiniteFindManyRidePassenger<TArgs extends Prisma.RidePassengerFindManyArgs, TQueryFnData = Array<Prisma.RidePassengerGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/findMany`, args, options, fetch);
}

export function useSuspenseFindManyRidePassenger<TArgs extends Prisma.RidePassengerFindManyArgs, TQueryFnData = Array<Prisma.RidePassengerGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyRidePassenger<TArgs extends Prisma.RidePassengerFindManyArgs, TQueryFnData = Array<Prisma.RidePassengerGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/findMany`, args, options, fetch);
}

export function useFindUniqueRidePassenger<TArgs extends Prisma.RidePassengerFindUniqueArgs, TQueryFnData = Prisma.RidePassengerGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RidePassengerFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueRidePassenger<TArgs extends Prisma.RidePassengerFindUniqueArgs, TQueryFnData = Prisma.RidePassengerGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RidePassengerFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/findUnique`, args, options, fetch);
}

export function useFindFirstRidePassenger<TArgs extends Prisma.RidePassengerFindFirstArgs, TQueryFnData = Prisma.RidePassengerGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstRidePassenger<TArgs extends Prisma.RidePassengerFindFirstArgs, TQueryFnData = Prisma.RidePassengerGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/findFirst`, args, options, fetch);
}

export function useUpdateRidePassenger(options?: Omit<(UseMutationOptions<(RidePassenger | undefined), DefaultError, Prisma.RidePassengerUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerUpdateArgs, DefaultError, RidePassenger, true>('RidePassenger', 'PUT', `${endpoint}/ridePassenger/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RidePassenger, Prisma.RidePassengerGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RidePassenger, Prisma.RidePassengerGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyRidePassenger(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RidePassengerUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('RidePassenger', 'PUT', `${endpoint}/ridePassenger/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertRidePassenger(options?: Omit<(UseMutationOptions<(RidePassenger | undefined), DefaultError, Prisma.RidePassengerUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerUpsertArgs, DefaultError, RidePassenger, true>('RidePassenger', 'POST', `${endpoint}/ridePassenger/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RidePassenger, Prisma.RidePassengerGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RidePassenger, Prisma.RidePassengerGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteRidePassenger(options?: Omit<(UseMutationOptions<(RidePassenger | undefined), DefaultError, Prisma.RidePassengerDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerDeleteArgs, DefaultError, RidePassenger, true>('RidePassenger', 'DELETE', `${endpoint}/ridePassenger/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RidePassenger, Prisma.RidePassengerGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RidePassenger, Prisma.RidePassengerGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyRidePassenger(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RidePassengerDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RidePassengerDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('RidePassenger', 'DELETE', `${endpoint}/ridePassenger/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RidePassengerDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RidePassengerDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RidePassengerDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateRidePassenger<TArgs extends Prisma.RidePassengerAggregateArgs, TQueryFnData = Prisma.GetRidePassengerAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RidePassengerAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateRidePassenger<TArgs extends Prisma.RidePassengerAggregateArgs, TQueryFnData = Prisma.GetRidePassengerAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RidePassengerAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/aggregate`, args, options, fetch);
}

export function useGroupByRidePassenger<TArgs extends Prisma.RidePassengerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RidePassengerGroupByArgs['orderBy'] } : { orderBy?: Prisma.RidePassengerGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RidePassengerGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RidePassengerGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RidePassengerGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RidePassengerGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RidePassengerGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByRidePassenger<TArgs extends Prisma.RidePassengerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RidePassengerGroupByArgs['orderBy'] } : { orderBy?: Prisma.RidePassengerGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RidePassengerGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RidePassengerGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RidePassengerGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RidePassengerGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RidePassengerGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/groupBy`, args, options, fetch);
}

export function useCountRidePassenger<TArgs extends Prisma.RidePassengerCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RidePassengerCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/count`, args, options, fetch);
}

export function useSuspenseCountRidePassenger<TArgs extends Prisma.RidePassengerCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RidePassengerCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RidePassengerCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RidePassenger', `${endpoint}/ridePassenger/count`, args, options, fetch);
}

export function useCheckRidePassenger<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; passengerId?: string; rideId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('RidePassenger', `${endpoint}/ridePassenger/check`, args, options, fetch);
}
