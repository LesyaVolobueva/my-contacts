export const getFilteredCalls = (state) => {
    const { calls } = state.calls;
    const { filterOutgoing, filterIncoming } = state.filter;

    if (filterIncoming) {
        return [...calls].filter(call => call.incoming);
    } else if (filterOutgoing) {
        return [...calls].filter(call => !call.incoming);
    }

    return calls;
};