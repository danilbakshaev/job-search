<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    jobs: gql`
      query {
        jobs {
          id
          title
          tags {
            name
          }
          remotes {
            name
          }
          cities {
            name
          }
          company {
            logoUrl
            name
          }
        }
      }
    `,
  },
};
</script>
