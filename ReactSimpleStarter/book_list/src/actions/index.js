export function selectBook(book){
    // selectBook is an action creator, it needs to return an action: an object with a type property, which describes the action; as well as a payload.
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}