table! {
    page_categories (category_name, page_stub) {
        category_name -> Text,
        page_stub -> Text,
    }
}

table! {
    page_technologies (page_stub, technology_stub) {
        page_stub -> Text,
        technology_stub -> Text,
    }
}

table! {
    pages (stub) {
        stub -> Text,
        kind -> Text,
        title -> Text,
        content -> Text,
        image -> Nullable<Text>,
        has_comments -> Bool,
        is_hidden -> Bool,
        created_on -> Timestamp,
        updated_on -> Timestamp,
        deleted_on -> Nullable<Timestamp>,
        publicated_on -> Timestamp,
        author_username -> Text,
    }
}

table! {
    user_tokens (token) {
        token -> Text,
        user_username -> Text,
        created_on -> Timestamp,
        expires_on -> Timestamp,
    }
}

table! {
    users (username) {
        username -> Text,
        display_name -> Nullable<Text>,
        created_on -> Timestamp,
        deleted_on -> Nullable<Timestamp>,
    }
}

joinable!(page_categories -> pages (page_stub));
joinable!(pages -> users (author_username));
joinable!(user_tokens -> users (user_username));

allow_tables_to_appear_in_same_query!(
    page_categories,
    page_technologies,
    pages,
    user_tokens,
    users,
);
