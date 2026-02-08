#!/usr/bin/env python3
"""
Verbose MCP Server - A simple MCP server with mathematical operations
Provides add, multiply, and subtract tools with detailed logging
"""

import logging
from mcp.server.fastmcp import FastMCP

# Configure verbose logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("verbose_mcp_server")

# Initialize FastMCP server
mcp = FastMCP("Verbose Math Server")

@mcp.tool()
def add(a: float, b: float) -> float:
    """
    Add two numbers together.

    Args:
        a: First number to add
        b: Second number to add

    Returns:
        The sum of a and b
    """
    logger.info(f"ADD operation called with a={a}, b={b}")
    result = a + b
    logger.info(f"ADD result: {a} + {b} = {result}")
    return result

@mcp.tool()
def multiply(a: float, b: float) -> float:
    """
    Multiply two numbers together.

    Args:
        a: First number to multiply
        b: Second number to multiply

    Returns:
        The product of a and b
    """
    logger.info(f"MULTIPLY operation called with a={a}, b={b}")
    result = a * b
    logger.info(f"MULTIPLY result: {a} × {b} = {result}")
    return result

@mcp.tool()
def subtract(a: float, b: float) -> float:
    """
    Subtract the second number from the first.

    Args:
        a: Number to subtract from
        b: Number to subtract

    Returns:
        The difference (a - b)
    """
    logger.info(f"SUBTRACT operation called with a={a}, b={b}")
    result = a - b
    logger.info(f"SUBTRACT result: {a} - {b} = {result}")
    return result

if __name__ == "__main__":
    logger.info("Starting Verbose Math MCP Server...")
    logger.info("Available tools: add, multiply, subtract")
    mcp.run()
