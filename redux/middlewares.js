const createExposedPromise = () => {
    const deferred = {}

    const promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
    })

    return [promise, deferred]
}


export default store => next => action => {
   
    if (!action.DEFERRED) {
        return next(action);
    }

    const [promise, deferred] = createExposedPromise()
    action.DEFERRED = deferred;
    // console.log('action', action)
    next({ ...action })
    return promise
};