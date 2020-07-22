---
type: "article"
path: "/getting-cozy-with-usequery-and-usemutation"
title: "Getting Cozy with useQuery and useMutation"
metaTitle: "Getting Cozy with useQuery and useMutation"
metaDescription: "Take some time to explore the new React hooks inside the Apollo Client."
date: "2019-09-20"
twitterImage: ""
---

## Apollo Client and React hooks together at last!

Since the announcement of React hooks, I have been excited to see this streamlined functionality to come to the Apollo Client. [Now we have three new React hooks available to us in version 3 of the Apollo Client](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2): [useQuery](https://www.apollographql.com/docs/react/api/react-hooks/#usequery), [useMutation](https://www.apollographql.com/docs/react/api/react-hooks/#usemutation), and [useLazyQuery](https://www.apollographql.com/docs/react/api/react-hooks/#uselazyquery).

Today we'll look at the way these change how you interact with the Apollo Client in your functional components. These hooks help you do the same queries and mutations as before with *much* less code, which make your codebase more natural to understand and maintain.

## The dark history before hooks.

If you have not had a chance to check out React hooks yet, take some time to [familiarize yourself](https://reactjs.org/docs/hooks-intro.html). They are a much-appreciated breath of fresh air in [React.js](https://reactjs.org/), not to mention, the future of React state in many cases.

Before React hooks, if you wanted to store anything in a component's state, you would need to make that component into a class-based component rather than a [functional component](https://reactjs.org/docs/components-and-props.html#function-and-class-components). What would often happen would be that you would start with a functional component and when you needed to store state for that functional component you would then have to go through the trouble of converting that to a class-based component. This workflow in itself introduced potential technical debt into your components which you could need to refactor at the drop of any feature request.

## Hooks to the rescue!

With the addition of React hooks, you get the ability to use state inside of a functional component. You no longer need to convert your functional component to a class-based component when having to add in component state. Instead, you include the useState hook that ships with React and continue on your merry way. No refactoring. Smoother sailing.

Hooks are a great way to handle state and keep you from needing to refactor your class-based component when you need state.

Now back to querying data with Apollo.

## Simplifying code with the useQuery hook.

The previous iteration of querying a GraphQL endpoint in Apollo Client was not bad. To get data from the endpoint, you used a Query component with a render props function as the child for that component. In practice querying a GraphQL endpoint would look something like this:

```jsx
const Item = () => (
  <Query query={MY_QUERY}>
    {({ loading, error, data }) => {
      return (
        <>
          {loading && <div>Loading...</div>}
          {error && <div>There was an error.</div>}
          {data && <div>Render content here</div>}
        </>
      );
    }}
  </Query>
);
```

In the example above the render props function makes understanding your components rendered output a little harder to grasp.

The new way of querying in Apollo makes understanding how queried data fits into the document's flow easier. You can now see clearly what the relationship to their parent component is. Here's what it looks like:

```jsx
const Item = () => {
  const { loading, error, data } = useQuery(MY_QUERY);
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error.</div>}
      {data && <div>Render content here</div>}
    </>
  );
};
```

With the new useQuery hook, you can see clearly what code is responsible for fetching data and what code is responsible for rendering UI. The new code is much easier to read and understand than the previous way of querying GraphQL data.

Now let's move on to the useMutation hook.

## Enjoying mutations with the useMutation hook.

The old way of doing GraphQL mutations with Apollo in React was similar to the way you queried data. The [react-apollo](https://www.npmjs.com/package/react-apollo) library provided a Mutation component which would take a render props function as its only child and pass the mutation function into that function. Here is an example of what that looked like using the Mutation component:

```jsx
const Item = () => {
  return (
    <Mutation mutation={MY_MUTATION}>
      {(mutate) => {
        return <button onClick={mutate}>Do mutation</button>;
      }}
    </Mutation>
  );
};
```

The example above gets the job done, but it is verbose and difficult to read. With the new way of mutating GraphQL data with React hooks is much simpler. Here's what the previous example looks like when you re-write it with the useMutation hook:

```jsx
const Item = () => {
  const mutation = useMutation(MY_MUTATION);
  return <button onClick={mutate}>Do mutation</button>;
};
```

That's much better! It's amazing how this change in the mutation API cleans up our code so much!

## Go forth and refactor!

The Apollo React hooks for querying and mutating data are a significant evolution. They make dealing with data more understandable and maintainable. They also remove a lot of, now, unneeded code.

Now, go back to your project and refactor. Down the road, you'll be thankful that you did.
