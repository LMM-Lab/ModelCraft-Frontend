import styled from "styled-components";

type GridProps = {
  grid_template_columns?: string;
  grid_template_rows?: string;
  grid_template_areas?: string;
  grid_auto_columns?: string;
  grid_auto_rows?: string;
  grid_auto_flow?: string;
  justify_items?: string;
  align_items?: string;
  place_items?: string;
  justify_content?: string;
  align_content?: string;
  place_content?: string;
};

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ grid_template_columns }) => grid_template_columns};
  grid-template-rows: ${({ grid_template_rows }) => grid_template_rows};
  grid-template-areas: ${({ grid_template_areas }) => grid_template_areas};
  grid-auto-columns: ${({ grid_auto_columns }) => grid_auto_columns};
  grid-auto-rows: ${({ grid_auto_rows }) => grid_auto_rows};
  grid-auto-flow: ${({ grid_auto_flow }) => grid_auto_flow};
  justify-items: ${({ justify_items }) => justify_items};
  align-items: ${({ align_items }) => align_items};
  place-items: ${({ place_items }) => place_items};
  justify-content: ${({ justify_content }) => justify_content};
  align-content: ${({ align_content }) => align_content};
  place-content: ${({ place_content }) => place_content};
`;


export default Grid