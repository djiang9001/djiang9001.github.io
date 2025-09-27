import { styled } from '@mui/material';
import { Box } from '@mui/material';

export const Panel = styled(Box)(({ theme }) => ({
  overflow: "auto",
  maxHeight: "360px",
  maxWidth: "360px",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: theme.spacing(1),
}));
// export const Panel: FC<BoxProps> = (props: BoxProps) => {
//   const {
//     children,
//     ...restProps
//   } = props;

//   return (
//     <Box sx={{ overflow: "auto", maxHeight: "360px", maxWidth: "360px", padding: 2, display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }} {...restProps}>
//       {children}
//     </Box>
//   )
// }