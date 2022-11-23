#
# Copyright (c) 2022 Airbyte, Inc., all rights reserved.
#

import logging
from abc import ABC, abstractmethod
from typing import Any, List, Mapping, Optional, Text, Tuple

from airbyte_cdk.models.airbyte_protocol import SyncMode
from airbyte_cdk.sources.source import Source
from airbyte_cdk.sources.streams import Stream


class ConnectionChecker(ABC):
    """
    Abstract base class for checking a connection
    """

    @abstractmethod
    def check_connection(self, source: Source, logger: logging.Logger, config: Mapping[str, Any]) -> Tuple[bool, any]:
        """
        Tests if the input configuration can be used to successfully connect to the integration e.g: if a provided Stripe API token can be used to connect
        to the Stripe API.

        :param source: source
        :param logger: source logger
        :param config: The user-provided configuration as specified by the source's spec.
          This usually contains information required to check connection e.g. tokens, secrets and keys etc.
        :return: A tuple of (boolean, error). If boolean is true, then the connection check is successful
          and we can connect to the underlying data source using the provided configuration.
          Otherwise, the input config cannot be used to connect to the underlying data source,
          and the "error" object should describe what went wrong.
          The error object will be cast to string to display the problem to the user.
        """
        pass

class AvailabilityStrategy(ABC):
    """
    Abstract base class for checking a connection
    """

    @abstractmethod
    def check_availability(self, source: Source, stream: Stream) -> Tuple[bool, any]:
        """
        Tests if the input configuration can be used to successfully connect to the integration e.g: if a provided Stripe API token can be used to connect
        to the Stripe API.

        :param source: source
        :param logger: source logger
        :param config: The user-provided configuration as specified by the source's spec.
          This usually contains information required to check connection e.g. tokens, secrets and keys etc.
        :return: A tuple of (boolean, error). If boolean is true, then the connection check is successful
          and we can connect to the underlying data source using the provided configuration.
          Otherwise, the input config cannot be used to connect to the underlying data source,
          and the "error" object should describe what went wrong.
          The error object will be cast to string to display the problem to the user.
        """
        pass

class HTTPAvailabilityStrategy(AvailabilityStrategy):
    """

    """

    @staticmethod
    def check_availability(self, source: Source, stream: Stream) -> Tuple[bool, any]:
        """

        :param self:
        :param stream:
        :return:
        """
        try:
            # Some streams need a stream slice to read records (eg if they have a SubstreamSlicer)
            # stream_slice = self._get_stream_slice(stream)
            records = stream.read_records(sync_mode=SyncMode.full_refresh) #stream_slice=stream_slice
            next(records)
        except Exception as error:
            return False, f"Unable to connect to stream {stream.name} - {error}"
        return True, None

class ScopedAvailabilityStrategy(AvailabilityStrategy):
    def check_availability(self, source: Source, stream: Stream) -> Tuple[bool, Optional[str]]:
        if all(self.required_scopes[stream] in self.get_granted_scopes()):
            return True, None
        else:
            missing_scopes = set(self.required_scopes[stream]) ^ set(self.get_granted_scopes())
        return False, f"Missing required scopes: {missing_scopes}"

    @abstractmethod
    def get_granted_scopes(self):
        """

        :return: A list of scopes granted to the user.
        """


    @abstractmethod
    def required_scopes(self):
        """

        :return: A dict of (stream name: list of required scopes). Should contain
        at minimum all streams defined in self.streams.
        """
