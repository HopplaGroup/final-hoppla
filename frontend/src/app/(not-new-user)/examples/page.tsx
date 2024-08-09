import { Button } from "@/components/ui/actions/button";
import { Dropdown } from "@/components/ui/actions";

type ExamplesPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ExamplesPage({
  params,
  searchParams,
}: ExamplesPageProps) {
  return (
    <div className="container space-y-8">
      <div>
        <h3>Button</h3>
        <div>
          <Button>Button</Button>
        </div>
      </div>
      <div>
        <h3>Dropdwon</h3>
        <div>
          <Dropdown.Menu>
            <Dropdown.Button>Dropdown</Dropdown.Button>
            <Dropdown.Items>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item>Item 3</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Menu>
        </div>
      </div>
    </div>
  );
}
