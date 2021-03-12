const PropsComponent: FC<{ foo: string; bar: number }> = (props) => <div>{props.foo}</div>;
type PropsComponentType = typeof PropsComponent;
type PropsComponentPropsType = ComponentProps<typeof PropsComponent>;

const Children: FC<{ component: ReactElement<PropsComponentPropsType, PropsComponentType> }> = (props) => (
  <div>{props.component}</div>
);

export const Parent: FC = () => <Children component={<PropsComponent foo="foo" bar={1} />} />;
export const Parent2: FC = () => <Children component={<div />} />; // => こっちも通っちゃう