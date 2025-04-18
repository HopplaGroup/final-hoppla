/* eslint-disable */
import type { Prisma, ContactSubmission } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateContactSubmission(options?: Omit<(UseMutationOptions<(ContactSubmission | undefined), DefaultError, Prisma.ContactSubmissionCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ContactSubmissionCreateArgs, DefaultError, ContactSubmission, true>('ContactSubmission', 'POST', `${endpoint}/contactSubmission/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ContactSubmissionCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ContactSubmissionCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ContactSubmission, Prisma.ContactSubmissionGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ContactSubmissionCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ContactSubmission, Prisma.ContactSubmissionGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyContactSubmission(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ContactSubmissionCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ContactSubmissionCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('ContactSubmission', 'POST', `${endpoint}/contactSubmission/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ContactSubmissionCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ContactSubmissionCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ContactSubmissionCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyContactSubmission<TArgs extends Prisma.ContactSubmissionFindManyArgs, TQueryFnData = Array<Prisma.ContactSubmissionGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/findMany`, args, options, fetch);
}

export function useInfiniteFindManyContactSubmission<TArgs extends Prisma.ContactSubmissionFindManyArgs, TQueryFnData = Array<Prisma.ContactSubmissionGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/findMany`, args, options, fetch);
}

export function useSuspenseFindManyContactSubmission<TArgs extends Prisma.ContactSubmissionFindManyArgs, TQueryFnData = Array<Prisma.ContactSubmissionGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyContactSubmission<TArgs extends Prisma.ContactSubmissionFindManyArgs, TQueryFnData = Array<Prisma.ContactSubmissionGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/findMany`, args, options, fetch);
}

export function useFindUniqueContactSubmission<TArgs extends Prisma.ContactSubmissionFindUniqueArgs, TQueryFnData = Prisma.ContactSubmissionGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueContactSubmission<TArgs extends Prisma.ContactSubmissionFindUniqueArgs, TQueryFnData = Prisma.ContactSubmissionGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/findUnique`, args, options, fetch);
}

export function useFindFirstContactSubmission<TArgs extends Prisma.ContactSubmissionFindFirstArgs, TQueryFnData = Prisma.ContactSubmissionGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstContactSubmission<TArgs extends Prisma.ContactSubmissionFindFirstArgs, TQueryFnData = Prisma.ContactSubmissionGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/findFirst`, args, options, fetch);
}

export function useUpdateContactSubmission(options?: Omit<(UseMutationOptions<(ContactSubmission | undefined), DefaultError, Prisma.ContactSubmissionUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ContactSubmissionUpdateArgs, DefaultError, ContactSubmission, true>('ContactSubmission', 'PUT', `${endpoint}/contactSubmission/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ContactSubmissionUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ContactSubmissionUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ContactSubmission, Prisma.ContactSubmissionGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ContactSubmissionUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ContactSubmission, Prisma.ContactSubmissionGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyContactSubmission(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ContactSubmissionUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ContactSubmissionUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('ContactSubmission', 'PUT', `${endpoint}/contactSubmission/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ContactSubmissionUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ContactSubmissionUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ContactSubmissionUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertContactSubmission(options?: Omit<(UseMutationOptions<(ContactSubmission | undefined), DefaultError, Prisma.ContactSubmissionUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ContactSubmissionUpsertArgs, DefaultError, ContactSubmission, true>('ContactSubmission', 'POST', `${endpoint}/contactSubmission/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ContactSubmissionUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.ContactSubmissionUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ContactSubmission, Prisma.ContactSubmissionGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ContactSubmissionUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ContactSubmission, Prisma.ContactSubmissionGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteContactSubmission(options?: Omit<(UseMutationOptions<(ContactSubmission | undefined), DefaultError, Prisma.ContactSubmissionDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ContactSubmissionDeleteArgs, DefaultError, ContactSubmission, true>('ContactSubmission', 'DELETE', `${endpoint}/contactSubmission/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ContactSubmissionDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.ContactSubmissionDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ContactSubmission, Prisma.ContactSubmissionGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ContactSubmissionDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ContactSubmission, Prisma.ContactSubmissionGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyContactSubmission(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ContactSubmissionDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ContactSubmissionDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('ContactSubmission', 'DELETE', `${endpoint}/contactSubmission/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ContactSubmissionDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ContactSubmissionDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ContactSubmissionDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateContactSubmission<TArgs extends Prisma.ContactSubmissionAggregateArgs, TQueryFnData = Prisma.GetContactSubmissionAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateContactSubmission<TArgs extends Prisma.ContactSubmissionAggregateArgs, TQueryFnData = Prisma.GetContactSubmissionAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/aggregate`, args, options, fetch);
}

export function useGroupByContactSubmission<TArgs extends Prisma.ContactSubmissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ContactSubmissionGroupByArgs['orderBy'] } : { orderBy?: Prisma.ContactSubmissionGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.ContactSubmissionGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.ContactSubmissionGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.ContactSubmissionGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.ContactSubmissionGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.ContactSubmissionGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByContactSubmission<TArgs extends Prisma.ContactSubmissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ContactSubmissionGroupByArgs['orderBy'] } : { orderBy?: Prisma.ContactSubmissionGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.ContactSubmissionGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.ContactSubmissionGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.ContactSubmissionGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.ContactSubmissionGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.ContactSubmissionGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/groupBy`, args, options, fetch);
}

export function useCountContactSubmission<TArgs extends Prisma.ContactSubmissionCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.ContactSubmissionCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/count`, args, options, fetch);
}

export function useSuspenseCountContactSubmission<TArgs extends Prisma.ContactSubmissionCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.ContactSubmissionCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ContactSubmissionCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ContactSubmission', `${endpoint}/contactSubmission/count`, args, options, fetch);
}
import type { ContactSubmissionStatus, ContactSubmissionType } from '@zenstackhq/runtime/models';

export function useCheckContactSubmission<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; name?: string; email?: string; message?: string; status?: ContactSubmissionStatus; type?: ContactSubmissionType }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('ContactSubmission', `${endpoint}/contactSubmission/check`, args, options, fetch);
}
