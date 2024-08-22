/* eslint-disable */
import type { Prisma, DriverVerificationRequest } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateDriverVerificationRequest(options?: Omit<(UseMutationOptions<(DriverVerificationRequest | undefined), DefaultError, Prisma.DriverVerificationRequestCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.DriverVerificationRequestCreateArgs, DefaultError, DriverVerificationRequest, true>('DriverVerificationRequest', 'POST', `${endpoint}/driverVerificationRequest/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.DriverVerificationRequestCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.DriverVerificationRequestCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, DriverVerificationRequest, Prisma.DriverVerificationRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.DriverVerificationRequestCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, DriverVerificationRequest, Prisma.DriverVerificationRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyDriverVerificationRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.DriverVerificationRequestCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.DriverVerificationRequestCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('DriverVerificationRequest', 'POST', `${endpoint}/driverVerificationRequest/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.DriverVerificationRequestCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.DriverVerificationRequestCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.DriverVerificationRequestCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestFindManyArgs, TQueryFnData = Array<Prisma.DriverVerificationRequestGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/findMany`, args, options, fetch);
}

export function useInfiniteFindManyDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestFindManyArgs, TQueryFnData = Array<Prisma.DriverVerificationRequestGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/findMany`, args, options, fetch);
}

export function useSuspenseFindManyDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestFindManyArgs, TQueryFnData = Array<Prisma.DriverVerificationRequestGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestFindManyArgs, TQueryFnData = Array<Prisma.DriverVerificationRequestGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/findMany`, args, options, fetch);
}

export function useFindUniqueDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestFindUniqueArgs, TQueryFnData = Prisma.DriverVerificationRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestFindUniqueArgs, TQueryFnData = Prisma.DriverVerificationRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/findUnique`, args, options, fetch);
}

export function useFindFirstDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestFindFirstArgs, TQueryFnData = Prisma.DriverVerificationRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestFindFirstArgs, TQueryFnData = Prisma.DriverVerificationRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/findFirst`, args, options, fetch);
}

export function useUpdateDriverVerificationRequest(options?: Omit<(UseMutationOptions<(DriverVerificationRequest | undefined), DefaultError, Prisma.DriverVerificationRequestUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.DriverVerificationRequestUpdateArgs, DefaultError, DriverVerificationRequest, true>('DriverVerificationRequest', 'PUT', `${endpoint}/driverVerificationRequest/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.DriverVerificationRequestUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.DriverVerificationRequestUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, DriverVerificationRequest, Prisma.DriverVerificationRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.DriverVerificationRequestUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, DriverVerificationRequest, Prisma.DriverVerificationRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyDriverVerificationRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.DriverVerificationRequestUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.DriverVerificationRequestUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('DriverVerificationRequest', 'PUT', `${endpoint}/driverVerificationRequest/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.DriverVerificationRequestUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.DriverVerificationRequestUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.DriverVerificationRequestUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertDriverVerificationRequest(options?: Omit<(UseMutationOptions<(DriverVerificationRequest | undefined), DefaultError, Prisma.DriverVerificationRequestUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.DriverVerificationRequestUpsertArgs, DefaultError, DriverVerificationRequest, true>('DriverVerificationRequest', 'POST', `${endpoint}/driverVerificationRequest/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.DriverVerificationRequestUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.DriverVerificationRequestUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, DriverVerificationRequest, Prisma.DriverVerificationRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.DriverVerificationRequestUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, DriverVerificationRequest, Prisma.DriverVerificationRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteDriverVerificationRequest(options?: Omit<(UseMutationOptions<(DriverVerificationRequest | undefined), DefaultError, Prisma.DriverVerificationRequestDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.DriverVerificationRequestDeleteArgs, DefaultError, DriverVerificationRequest, true>('DriverVerificationRequest', 'DELETE', `${endpoint}/driverVerificationRequest/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.DriverVerificationRequestDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.DriverVerificationRequestDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, DriverVerificationRequest, Prisma.DriverVerificationRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.DriverVerificationRequestDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, DriverVerificationRequest, Prisma.DriverVerificationRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyDriverVerificationRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.DriverVerificationRequestDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.DriverVerificationRequestDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('DriverVerificationRequest', 'DELETE', `${endpoint}/driverVerificationRequest/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.DriverVerificationRequestDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.DriverVerificationRequestDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.DriverVerificationRequestDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestAggregateArgs, TQueryFnData = Prisma.GetDriverVerificationRequestAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestAggregateArgs, TQueryFnData = Prisma.GetDriverVerificationRequestAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/aggregate`, args, options, fetch);
}

export function useGroupByDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.DriverVerificationRequestGroupByArgs['orderBy'] } : { orderBy?: Prisma.DriverVerificationRequestGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.DriverVerificationRequestGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.DriverVerificationRequestGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.DriverVerificationRequestGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.DriverVerificationRequestGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.DriverVerificationRequestGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.DriverVerificationRequestGroupByArgs['orderBy'] } : { orderBy?: Prisma.DriverVerificationRequestGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.DriverVerificationRequestGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.DriverVerificationRequestGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.DriverVerificationRequestGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.DriverVerificationRequestGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.DriverVerificationRequestGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/groupBy`, args, options, fetch);
}

export function useCountDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.DriverVerificationRequestCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/count`, args, options, fetch);
}

export function useSuspenseCountDriverVerificationRequest<TArgs extends Prisma.DriverVerificationRequestCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.DriverVerificationRequestCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.DriverVerificationRequestCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/count`, args, options, fetch);
}
import type { DriverVerificationRequestStatus } from '@zenstackhq/runtime/models';

export function useCheckDriverVerificationRequest<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; licencePhotos?: string; selfie?: string; status?: DriverVerificationRequestStatus; driverId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('DriverVerificationRequest', `${endpoint}/driverVerificationRequest/check`, args, options, fetch);
}
