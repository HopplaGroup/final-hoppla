/* eslint-disable */
import type { Prisma, RideRule } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateRideRule(options?: Omit<(UseMutationOptions<(RideRule | undefined), DefaultError, Prisma.RideRuleCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideRuleCreateArgs, DefaultError, RideRule, true>('RideRule', 'POST', `${endpoint}/rideRule/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideRuleCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideRuleCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideRule, Prisma.RideRuleGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideRuleCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideRule, Prisma.RideRuleGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyRideRule(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideRuleCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideRuleCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('RideRule', 'POST', `${endpoint}/rideRule/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideRuleCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideRuleCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideRuleCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyRideRule<TArgs extends Prisma.RideRuleFindManyArgs, TQueryFnData = Array<Prisma.RideRuleGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideRuleFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/findMany`, args, options, fetch);
}

export function useInfiniteFindManyRideRule<TArgs extends Prisma.RideRuleFindManyArgs, TQueryFnData = Array<Prisma.RideRuleGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideRuleFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/findMany`, args, options, fetch);
}

export function useSuspenseFindManyRideRule<TArgs extends Prisma.RideRuleFindManyArgs, TQueryFnData = Array<Prisma.RideRuleGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideRuleFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyRideRule<TArgs extends Prisma.RideRuleFindManyArgs, TQueryFnData = Array<Prisma.RideRuleGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideRuleFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/findMany`, args, options, fetch);
}

export function useFindUniqueRideRule<TArgs extends Prisma.RideRuleFindUniqueArgs, TQueryFnData = Prisma.RideRuleGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideRuleFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueRideRule<TArgs extends Prisma.RideRuleFindUniqueArgs, TQueryFnData = Prisma.RideRuleGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideRuleFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/findUnique`, args, options, fetch);
}

export function useFindFirstRideRule<TArgs extends Prisma.RideRuleFindFirstArgs, TQueryFnData = Prisma.RideRuleGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideRuleFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstRideRule<TArgs extends Prisma.RideRuleFindFirstArgs, TQueryFnData = Prisma.RideRuleGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideRuleFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/findFirst`, args, options, fetch);
}

export function useUpdateRideRule(options?: Omit<(UseMutationOptions<(RideRule | undefined), DefaultError, Prisma.RideRuleUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideRuleUpdateArgs, DefaultError, RideRule, true>('RideRule', 'PUT', `${endpoint}/rideRule/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideRuleUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideRuleUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideRule, Prisma.RideRuleGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideRuleUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideRule, Prisma.RideRuleGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyRideRule(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideRuleUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideRuleUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('RideRule', 'PUT', `${endpoint}/rideRule/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideRuleUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideRuleUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideRuleUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertRideRule(options?: Omit<(UseMutationOptions<(RideRule | undefined), DefaultError, Prisma.RideRuleUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideRuleUpsertArgs, DefaultError, RideRule, true>('RideRule', 'POST', `${endpoint}/rideRule/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideRuleUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideRuleUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideRule, Prisma.RideRuleGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideRuleUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideRule, Prisma.RideRuleGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteRideRule(options?: Omit<(UseMutationOptions<(RideRule | undefined), DefaultError, Prisma.RideRuleDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideRuleDeleteArgs, DefaultError, RideRule, true>('RideRule', 'DELETE', `${endpoint}/rideRule/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideRuleDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideRuleDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, RideRule, Prisma.RideRuleGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.RideRuleDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, RideRule, Prisma.RideRuleGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyRideRule(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.RideRuleDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.RideRuleDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('RideRule', 'DELETE', `${endpoint}/rideRule/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.RideRuleDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.RideRuleDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.RideRuleDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateRideRule<TArgs extends Prisma.RideRuleAggregateArgs, TQueryFnData = Prisma.GetRideRuleAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideRuleAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateRideRule<TArgs extends Prisma.RideRuleAggregateArgs, TQueryFnData = Prisma.GetRideRuleAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.RideRuleAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/aggregate`, args, options, fetch);
}

export function useGroupByRideRule<TArgs extends Prisma.RideRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RideRuleGroupByArgs['orderBy'] } : { orderBy?: Prisma.RideRuleGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RideRuleGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RideRuleGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RideRuleGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RideRuleGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RideRuleGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByRideRule<TArgs extends Prisma.RideRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.RideRuleGroupByArgs['orderBy'] } : { orderBy?: Prisma.RideRuleGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.RideRuleGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.RideRuleGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.RideRuleGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.RideRuleGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.RideRuleGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/groupBy`, args, options, fetch);
}

export function useCountRideRule<TArgs extends Prisma.RideRuleCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RideRuleCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideRuleCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/count`, args, options, fetch);
}

export function useSuspenseCountRideRule<TArgs extends Prisma.RideRuleCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.RideRuleCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.RideRuleCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('RideRule', `${endpoint}/rideRule/count`, args, options, fetch);
}

export function useCheckRideRule<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; ruleId?: string; rideId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('RideRule', `${endpoint}/rideRule/check`, args, options, fetch);
}
