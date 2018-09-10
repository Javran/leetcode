/**
 * @param {function} knows()
 * @return {function}
 */
const solution = knows => {
    /**
     * @param {integer} n Total people
     * @return {integer} The celebrity
     */
    return n => {
      let candidate = 0
      /*
         read comments in the body of the loop first.

         we get the nice invariant that every iteration of
         this loop helps us eliminate one person,
         leaving "candidate" the only one to be tested.
       */
      for (let i = 1; i < n; ++i) {
        if (knows(candidate, i)) {
          /*
             current candidate cannot be the celebrity,
             but it's possible that i is.
           */
          candidate = i
        }
        /*
           if knows(candidate, i) === false,
           there is at least one person candidate that don't know about i,
           which means i cannot be the celebrity.
         */
      }

      for (let i = 0; i < n; ++i) {
        /*
        // this is more straightforward
        if (candidate !== i) {
          if (knows(i, candidate) && !knows(candidate, i)) {
          } else {
            return -1
          }
        }
        */
        if (
          candidate !== i &&
          (
            knows(candidate, i) || !knows(i, candidate)
          )
        ) {
          return -1
        }
      }
      return candidate
    }
}
