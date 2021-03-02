const Directory: FC<{ node: DirectoryNode, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }> = ({ node, isOpen, setIsOpen }) => {
  const [childNodes, setChildNodes] = useState<Array<DirectoryNode | FileNode> | null>(null)
  useEffect(() => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setChildNodes(getChildNodes(currentPath))
    } else {
      setChildNodes(null)
    }
  }, [isOpen]);

  return (
    <>
      <Line>{currentPath}</Line>
      {isOpen && childNodes.map(node => node.type === "directory" ? <Directory node={node} /> : <File node={node} />)}
    </>
  );
};
