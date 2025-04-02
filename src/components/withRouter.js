import { useRouter } from 'next/router';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const router = useRouter();
    
    // Map Next.js router properties href match the React Router structure
    const routerProps = {
      location: {
        pathname: router.pathname,
        query: router.query,
      },
      navigate: (path, options = {}) => {
        router.push(path, undefined, options);
      },
      params: router.query, // In Next.js, query parameters act as params
    };

    return <Component {...props} router={routerProps} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;