import { Input, Tag, TagCloseButton, TagLabel, VStack, Wrap } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

type GroupsInputProps = {
  groups: string[];
  setGroups: (groups: string[]) => void;
  isRounded?: boolean;
};

const GroupsInput: FunctionComponent<GroupsInputProps> = ({
  groups,
  setGroups,
  isRounded,
}) => {
  const [newGroup, setNewGroup] = useState('');

  function setNewGroupInput(value: string) {
    if (value.endsWith(' ')) {
      const removedDuplicates = Array.from(new Set([...groups, value.trim()]));
      if (value !== ' ') {
        setGroups(removedDuplicates);
      }
      setNewGroup('');
    } else {
      setNewGroup(value);
    }
  }

  function deleteGroup(name: string) {
    const newGroups = groups.filter((el) => el !== name);
    setGroups(newGroups);
  }

  return (
    <VStack alignItems="start" width="100%">
      <Input
        size={isRounded ? 'md' : 'sm'}
        borderRadius={isRounded ? '20px' : undefined}
        placeholder="Groups"
        value={newGroup}
        onChange={(e) => setNewGroupInput(e.target.value)}
      />
      <Wrap>
        {groups.map((group) => (
          <Tag
            size="sm"
            key={`collection-group-list-${group}`}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
            mx="0.25rem"
            my="0.2rem"
          >
            <TagLabel>{group}</TagLabel>
            <TagCloseButton onClick={() => deleteGroup(group)} />
          </Tag>
        ))}
      </Wrap>
    </VStack>
  );
};

export default GroupsInput;
