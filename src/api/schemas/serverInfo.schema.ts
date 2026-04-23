import { z } from 'zod';

/**
 * The schema used to describe and transform the server info data
 * returned from the `GET /api/status/server-information` endpoint
 */
const serverInfoSchema = z
  .object({
    serviceUser: z.string(),
    homebridgeConfigJsonPath: z.string(),
    homebridgeStoragePath: z.string(),
    homebridgePluginPath: z.string(),
    homebridgeCustomPluginPath: z.string(),
    homebridgeInsecureMode: z.boolean(),
    homebridgeRunningInDocker: z.boolean(),
    os: z.object({
      platform: z.string(),
      distro: z.string(),
      kernel: z.string(),
      arch: z.string(),
      hostname: z.string(),
    }),
    network: z.object({
      iface: z.string(),
      ip4: z.string(),
      ip4subnet: z.string(),
      ip6: z.string(),
      ip6subnet: z.string(),
      mac: z.string(),
      type: z.string(),
      duplex: z.string(),
      speed: z.number(),
      dnsSuffix: z.string(),
    }),
  })
  .transform((data) => {
    const { os, network } = data;
    return {
      system: {
        serviceUser: data.serviceUser,
        configPath: data.homebridgeConfigJsonPath,
        storagePath: data.homebridgeStoragePath,
        pluginPath: data.homebridgePluginPath,
        customPluginPath: data.homebridgeCustomPluginPath,
        insecureMode: data.homebridgeInsecureMode,
        docker: data.homebridgeRunningInDocker,
      },
      os: {
        platform: os.platform,
        distribution: os.distro,
        kernel: os.kernel,
        architecture: os.arch,
        hostname: os.hostname,
      },
      network: {
        interface: network.iface,
        ipv4Address: network.ip4,
        ipv4Subnet: network.ip4subnet,
        ipv6Address: network.ip6,
        ipv6Subnet: network.ip6subnet,
        macAddress: network.mac,
        connection: network.type,
        duplex: network.duplex,
        speed: network.speed,
        dnsSuffix: network.dnsSuffix,
      },
    };
  });

export default serverInfoSchema;
