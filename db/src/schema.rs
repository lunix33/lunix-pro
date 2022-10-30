// @generated automatically by Diesel CLI.

diesel::table! {
    group_permissions (group_name, permission) {
        group_name -> Text,
        permission -> Text,
    }
}

diesel::table! {
    groups (name) {
        name -> Text,
        created_on -> Timestamp,
        deleted_on -> Nullable<Timestamp>,
    }
}

diesel::table! {
    page_comments (id) {
        id -> Text,
        title -> Nullable<Text>,
        content -> Text,
        identity -> Text,
        page_stub -> Text,
        created_on -> Timestamp,
        deleted_on -> Nullable<Timestamp>,
    }
}

diesel::table! {
    page_metas (page_stub, key) {
        page_stub -> Text,
        key -> Text,
        value -> Nullable<Text>,
    }
}

diesel::table! {
    page_relations (page_stub, relation_stub) {
        page_stub -> Text,
        relation_stub -> Text,
    }
}

diesel::table! {
    pages (stub) {
        stub -> Text,
        kind -> Text,
        title -> Text,
        content -> Text,
        created_on -> Timestamp,
        updated_on -> Timestamp,
        deleted_on -> Nullable<Timestamp>,
        publicated_on -> Timestamp,
        author_username -> Text,
    }
}

diesel::table! {
    user_tokens (token) {
        token -> Text,
        user_username -> Text,
        created_on -> Timestamp,
        expires_on -> Timestamp,
    }
}

diesel::table! {
    users (username) {
        username -> Text,
        display_name -> Nullable<Text>,
        group_name -> Text,
        created_on -> Timestamp,
        deleted_on -> Nullable<Timestamp>,
    }
}

diesel::joinable!(page_metas -> pages (page_stub));
diesel::joinable!(pages -> users (author_username));
diesel::joinable!(user_tokens -> users (user_username));

diesel::allow_tables_to_appear_in_same_query!(
    group_permissions,
    groups,
    page_comments,
    page_metas,
    page_relations,
    pages,
    user_tokens,
    users,
);
