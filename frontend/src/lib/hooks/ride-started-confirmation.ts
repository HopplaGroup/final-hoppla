/* eslint-disable */
import type { Prisma, RideStartedConfirmation } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateRideStartedConfirmation(options?: Omit<(UseMutationOptions<(RideStartedConfirmation | undefined), DefaultError, Prisma.RideStartedConfirmationCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideStartedConfirmationCreateArgs, DefaultError, RideStartedConfirmation, true>('RideStartedConfirmation', 'POST', `${endpoint}/rideStartedConfirmation/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideStartedConfirmationCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideStartedConfirmationCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideStartedConfirmation, Prisma.RideStartedConfirmationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideStartedConfirmationCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideStartedConfirmation, Prisma.RideStartedConfirmationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyRideStartedConfirmation(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideStartedConfirmationCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideStartedConfirmationCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('RideStartedConfirmation', 'POST', `${endpoint}/rideStartedConfirmation/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideStartedConfirmationCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideStartedConfirmationCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideStartedConfirmationCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationFindManyArgs, TQueryFnData = Array<Prisma.RideStartedConfirmationGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/findMany`, args, options, fetch);
}

export function useInfiniteFindManyRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationFindManyArgs, TQueryFnData = Array<Prisma.RideStartedConfirmationGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/findMany`, args, options, fetch);
}

export function useSuspenseFindManyRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationFindManyArgs, TQueryFnData = Array<Prisma.RideStartedConfirmationGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationFindManyArgs, TQueryFnData = Array<Prisma.RideStartedConfirmationGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/findMany`, args, options, fetch);
}

export function useFindUniqueRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationFindUniqueArgs, TQueryFnData = Prisma.RideStartedConfirmationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationFindUniqueArgs, TQueryFnData = Prisma.RideStartedConfirmationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/findUnique`, args, options, fetch);
}

export function useFindFirstRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationFindFirstArgs, TQueryFnData = Prisma.RideStartedConfirmationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationFindFirstArgs, TQueryFnData = Prisma.RideStartedConfirmationGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/findFirst`, args, options, fetch);
}

export function useUpdateRideStartedConfirmation(options?: Omit<(UseMutationOptions<(RideStartedConfirmation | undefined), DefaultError, Prisma.RideStartedConfirmationUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideStartedConfirmationUpdateArgs, DefaultError, RideStartedConfirmation, true>('RideStartedConfirmation', 'PUT', `${endpoint}/rideStartedConfirmation/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideStartedConfirmationUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideStartedConfirmationUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideStartedConfirmation, Prisma.RideStartedConfirmationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideStartedConfirmationUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideStartedConfirmation, Prisma.RideStartedConfirmationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyRideStartedConfirmation(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideStartedConfirmationUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideStartedConfirmationUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('RideStartedConfirmation', 'PUT', `${endpoint}/rideStartedConfirmation/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideStartedConfirmationUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideStartedConfirmationUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideStartedConfirmationUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertRideStartedConfirmation(options?: Omit<(UseMutationOptions<(RideStartedConfirmation | undefined), DefaultError, Prisma.RideStartedConfirmationUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideStartedConfirmationUpsertArgs, DefaultError, RideStartedConfirmation, true>('RideStartedConfirmation', 'POST', `${endpoint}/rideStartedConfirmation/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideStartedConfirmationUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideStartedConfirmationUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideStartedConfirmation, Prisma.RideStartedConfirmationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideStartedConfirmationUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideStartedConfirmation, Prisma.RideStartedConfirmationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteRideStartedConfirmation(options?: Omit<(UseMutationOptions<(RideStartedConfirmation | undefined), DefaultError, Prisma.RideStartedConfirmationDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideStartedConfirmationDeleteArgs, DefaultError, RideStartedConfirmation, true>('RideStartedConfirmation', 'DELETE', `${endpoint}/rideStartedConfirmation/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideStartedConfirmationDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideStartedConfirmationDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideStartedConfirmation, Prisma.RideStartedConfirmationGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideStartedConfirmationDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideStartedConfirmation, Prisma.RideStartedConfirmationGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyRideStartedConfirmation(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideStartedConfirmationDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideStartedConfirmationDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('RideStartedConfirmation', 'DELETE', `${endpoint}/rideStartedConfirmation/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideStartedConfirmationDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideStartedConfirmationDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideStartedConfirmationDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationAggregateArgs, TQueryFnData = Prisma.GetRideStartedConfirmationAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationAggregateArgs, TQueryFnData = Prisma.GetRideStartedConfirmationAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/aggregate`, args, options, fetch);
}

export function useGroupByRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RideStartedConfirmationGroupByArgs['orderBy'] } : { orderBy?: Prisma.RideStartedConfirmationGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RideStartedConfirmationGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RideStartedConfirmationGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RideStartedConfirmationGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RideStartedConfirmationGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RideStartedConfirmationGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RideStartedConfirmationGroupByArgs['orderBy'] } : { orderBy?: Prisma.RideStartedConfirmationGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RideStartedConfirmationGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RideStartedConfirmationGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RideStartedConfirmationGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RideStartedConfirmationGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RideStartedConfirmationGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/groupBy`, args, options, fetch);
}

export function useCountRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RideStartedConfirmationCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/count`, args, options, fetch);
}

export function useSuspenseCountRideStartedConfirmation<TArgs extends Prisma.RideStartedConfirmationCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RideStartedConfirmationCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideStartedConfirmationCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/count`, args, options, fetch);
}

export function useCheckRideStartedConfirmation<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; userId?: string; rideId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('RideStartedConfirmation', `${endpoint}/rideStartedConfirmation/check`, args, options, fetch);
}
