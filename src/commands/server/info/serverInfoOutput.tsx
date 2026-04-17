import { FunctionComponent, ReactElement, useEffect, useMemo, useState } from 'react';
import { Box } from 'ink';
import { useApiClient } from '../../../hooks/index.js';
import { NodejsInfo, ServerInfo } from '../../../clients/types.js';
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

  const [serverInfo, setServerInfo] = useState<ServerInfo | undefined>();
  const [nodejsInfo, setNodejsInfo] = useState<NodejsInfo | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      // Fetch the server and Node.js info data
      // and set it to state once fetched
      setServerInfo(await client.getServerInfo());
      setNodejsInfo(await client.getNodejsInfo());
    })();
  }, [client, setServerInfo, setNodejsInfo]);

  /**
   * The list items for
   * the system list
   */
  const systemItems = useMemo<ListItem[]>(() => {
    if (serverInfo == null) {
      return [];
    }

    return [
      {
        name: 'service user',
        value: serverInfo.serviceUser,
      },
      {
        name: 'config path',
        value: serverInfo.homebridgeConfigJsonPath,
      },
      {
        name: 'storage path',
        value: serverInfo.homebridgeStoragePath,
      },
    ];
  }, [serverInfo]);

  /**
   * The list items for the
   * operating system list
   */
  const osItems = useMemo<ListItem[]>(() => {
    if (serverInfo == null) {
      return [];
    }

    const { os } = serverInfo;
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
  }, [serverInfo]);

  /**
   * The list items for
   * the network list
   */
  const networkItems = useMemo<ListItem[]>(() => {
    if (serverInfo == null) {
      return [];
    }

    const { network } = serverInfo;
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
  }, [serverInfo]);

  /**
   * The list items for
   * the Node.js list
   */
  const nodejsItems = useMemo<ListItem[]>(() => {
    if (nodejsInfo == null) {
      return [];
    }

    return [
      {
        name: 'current version',
        value: nodejsInfo.currentVersion,
      },
      {
        name: 'latest version',
        value: nodejsInfo.latestVersion,
      },
      {
        name: 'install path',
        value: nodejsInfo.installPath,
      },
      {
        name: 'npm version',
        value: nodejsInfo.npmVersion,
      },
    ];
  }, [nodejsInfo]);

  return (
    <>
      {
        (serverInfo == null) && (
          <Loader>
            Fetching server info
          </Loader>
        )
      }
      {
        (nodejsInfo == null) && (
          <Loader>
            Fetching Node.js info
          </Loader>
        )
      }
      {
        (serverInfo != null && nodejsInfo != null) && (
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
            <List
              title="Node.js"
              items={nodejsItems}
            />
          </Box>
        )
      }
    </>
  );
};

export default ServerInfoOutput;
