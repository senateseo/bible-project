import renderer from "react-test-renderer";
import Link from "./Link";

it("changes the class when hovered", () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );

  const user = {
    createdAt: new Date(),
    name: "Daniel Seo",
  };
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  //manuarlly trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});
