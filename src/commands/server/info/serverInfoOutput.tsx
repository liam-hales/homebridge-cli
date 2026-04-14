import { FunctionComponent, ReactElement, useEffect, useMemo, useState } from 'react';
import { Box } from 'ink';
import { useApiClient } from '../../../hooks/index.js';
import { ServerInfoResponse } from '../../../clients/types.js';
import { List, Loader } from '../../../components/index.js';
import { ListItem } from '../../../components/types.js';

/**
 * The output component rendered when
 * the `/server/info` command is executed
 *
 * @returns The `ServerInfoOutput` component
 */
const ServerInfoOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const [data, setData] = useState<ServerInfoResponse | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      const data = await client.getServerInfo();
      setData(data);
    })();
  }, [client, setData]);

  /**
   * The list items for
   * the system list
   */
  const systemItems = useMemo<ListItem[]>(() => {
    if (data == null) {
      return [];
    }

    return [
      {
        name: 'service user',
        value: data.serviceUser,
      },
      {
        name: 'config path',
        value: data.homebridgeConfigJsonPath,
      },
      {
        name: 'storage path',
        value: data.homebridgeStoragePath,
      },
    ];
  }, [data]);

  /**
   * The list items for the
   * operating system list
   */
  const osItems = useMemo<ListItem[]>(() => {
    if (data == null) {
      return [];
    }

    const { os } = data;
    return [
      {
        name: 'platform',
        value: os.platform,
      },
      {
        name: 'distribution',
        value: os.distro,
      },
      {
        name: 'kernal',
        value: os.kernel,
      },
      {
        name: 'architecture',
        value: os.arch,
      },
      {
        name: 'hostname',
        value: os.hostname,
      },
    ];
  }, [data]);

  /**
   * The list items for
   * the network list
   */
  const networkItems = useMemo<ListItem[]>(() => {
    if (data == null) {
      return [];
    }

    const { network } = data;
    return [
      {
        name: 'interface',
        value: network.iface,
      },
      {
        name: 'ipv4 address',
        value: network.ip4,
      },
      {
        name: 'ipv4 subnet',
        value: network.ip4subnet,
      },
      {
        name: 'ipv6 address',
        value: network.ip6,
      },
      {
        name: 'ipv6 subnet',
        value: network.ip6subnet,
      },
      {
        name: 'mac address',
        value: network.mac,
      },
      {
        name: 'connection',
        value: network.type,
      },
      {
        name: 'duplex',
        value: network.duplex,
      },
      {
        name: 'speed',
        value: `${network.speed}`,
      },
      {
        name: 'dns suffix',
        value: network.dnsSuffix,
      },
    ];
  }, [data]);

  return (
    <>
      {
        (data == null) && (
          <Loader>
            Fetching server info
          </Loader>
        )
      }
      {
        (data != null) && (
          <Box
            flexDirection="column"
            rowGap={1}
            marginY={1}
          >
            <List
              title="System"
              items={systemItems}
            />
            <List
              title="Operating System"
              items={osItems}
            />
            <List
              title="Network"
              items={networkItems}
            />
          </Box>
        )
      }
    </>
  );
};

export default ServerInfoOutput;
